const express = require('express');
const app = express();

var bodyParser = require('body-parser')

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
const Post = require('./models/Post')

app.all('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var mysql = require("mysql");

app.post('/botfilme', function(request, response) {

  var connection = mysql.createConnection({
      host     : process.env.MYSQL_HOST,
      user     : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASS,
      database : process.env.MYSQL_DB
  });
  connection.connect();

  var intentName = request.body.queryResult.intent.displayName;


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


if ( intentName == "usuario-cadastro"  )
  {  console.log('Entrou no intent -> cadastra-usuario')

   Post.create({
     nome: request.body.queryResult.parameters['nome'],
     email: request.body.queryResult.parameters['email']
   }).then(function(){
    response.json({"fulfillmentText" :"Você foi cadastrado com sucesso"})
   }).catch(function(erro){
    response.json({"fulfillmentText" :"Houve um erro no cadastro "})
   })
  }



else if ( intentName == "usuario-login"  )
  {
    console.log('Entrou no intent -> usuario-login')
    const email = request.body.queryResult.parameters['email'];

    var id='0';
    var query = 'select * from usuario where email = "'+email+'"';
    connection.query(query, function (error, results, fields) {
       if (error) throw error;
        var id_usuario = results.insertId;
       connection.end();
       response.json({"fulfillmentText" :"Olá "+results[0].nome+", me diz qual gênero de filme você gosta:"})
    });
  }


// ---- - - - - - - -- -- - - - - - - - - - - -- - - - - - - - - --- - - - - - - - - - - - - --
  else if ( intentName == "filme"  )
  {
 console.log('Entrou no intent -> filme')
    var id_usuario; var id_filme;
    var nome_genero = request.body.queryResult.parameters['nome-genero'];

    var query = 'select * from filme where genero = "'+nome_genero+'"';

         connection.query(query, function(error, results, fields) {
          if (error) throw error;
              var id_filme = results[0].id;
              var numRows = results.length - 1;

              var json_texto = '{"fulfillmentMessages": [';

              for (var i in results) {
                json_texto += '{"card" :{"title": ["'+results[i].titulo+'"],"imageUri": ["'+results[i].imagem+'"],"subtitle": ["'+results[i].genero+'"]}},{"text" :{"text": ["'+results[i].descricao+'"]}},{"text" :{"text": ["Esse filme foi aprovado por '+results[i].avaliacao+'% dos usuários do Google"]}},{"text" :{"text": ["Aqui ta o link do trailer '+results[i].url+'"]}}';
                    console.log(results[i])
            if ( i < numRows ) {
                  json_texto += ',';
                }
              }

            json_texto += ']}';
            response.send(json_texto);
          });

        // insert indicao na tabela
        var nota='0';   var id='0';   var data ='0';
         var query2 = 'insert into indicado values ("'+id_usuario+'","'+id_filme+'")';
          connection.query(query2, function (error, results, fields) {
         if (error) throw error;
        console.log('Todo Id:' + results.insertId);
         connection.end();
    });

  }
// ---- - - - - - - -- -- - - - - - - - - - - -- - - - - - - - - --- - - - - - - - - - - - - --


  else if ( intentName == "filme - no"  )
  {
 console.log('Entrou no intent -> filme')
    var id_usuario; var id_filme;
    var nome_genero = request.body.queryResult.parameters['nome-genero'];

    var query = 'select * from filme where genero = "'+nome_genero+'"';

         connection.query(query, function(error, results, fields) {
          if (error) throw error;
              var id_filme = results[0].id;
              var numRows = results.length - 1;

              var json_texto = '{"fulfillmentMessages": [';

              for (var i in results) {
                json_texto += '{"card" :{"title": ["'+results[i].titulo+'"],"imageUri": ["'+results[i].imagem+'"],"subtitle": ["'+results[i].genero+'"]}},{"text" :{"text": ["'+results[i].descricao+'"]}},{"text" :{"text": ["Esse filme foi aprovado por '+results[i].avaliacao+'% dos usuários do Google"]}},{"text" :{"text": ["Aqui ta o link do trailer '+results[i].url+'"]}}';
                    console.log(results[i])
            if ( i < numRows ) {
                  json_texto += ',';
                }
              }

            json_texto += ']}';
            response.send(json_texto);
          });

        // insert indicao na tabela
        var nota='0';   var id='0';   var data ='0';
         var query2 = 'insert into indicado values ("'+id_usuario+'","'+id_filme+'")';
          connection.query(query2, function (error, results, fields) {
         if (error) throw error;
        console.log('Todo Id:' + results.insertId);
         connection.end();
    });

  }
// ---- - - - - - - -- -- - - - - - - - - - - -- - - - - - - - - --- - - - - - - - - - - - - --



else if ( intentName == "filme - no"  )
  {
 console.log('Entrou no intent -> filme')

    var nome_genero = request.body.queryResult.parameters['nome-genero'];

    var query = 'select * from filme where genero = "'+nome_genero+'"';

         connection.query(query, function(error, results, fields) {
          if (error) throw error;



              var numRows = results.length - 1;

              var json_texto = '{"fulfillmentMessages": [';

              for (var i in results) {
                json_texto += '{"card" :{"title": ["'+results[i].titulo+'"],"imageUri": ["'+results[i].imagem+'"],"subtitle": ["'+results[i].genero+'"]}},{"text" :{"text": ["'+results[i].descricao+'"]}},{"text" :{"text": ["Esse filme foi aprovado por '+results[i].avaliacao+'% dos usuários do Google"]}},{"text" :{"text": ["Aqui ta o link do trailer '+results[i].url+'"]}}';
                    console.log(results[i])
            if ( i < numRows ) {
                  json_texto += ',';
                }
              }
            connection.end();
            json_texto += ']}';
            response.send(json_texto);
          });




  }
// ---- - - - - - - -- -- - - - - - - - - - - -- - - - - - - - - --- - - - - - - - - - - - - --



else if ( intentName == "indicar-filme"  )
  {
 console.log('Entrou no intent -> indicar-filme')

    var nome_genero = request.body.queryResult.parameters['nome-genero'];

    var query = 'select * from filme where genero = "'+nome_genero+'" ';

         connection.query(query, function(error, results, fields) {
          if (error) throw error;

              var numRows = results.length - 1;

               var id_filme = results[i].id;

              var json_texto = '{"fulfillmentMessages": [';

              for (var i in results) {
                json_texto += '{"card" :{"title": ["'+results[i].titulo+'"],"imageUri": ["'+results[i].imagem+'"],"subtitle": ["'+results[i].genero+'"]}},{"text" :{"text": ["'+results[i].descricao+'"]}},{"text" :{"text": ["Esse filme foi aprovado por '+results[i].avaliacao+'% dos usuários do Google"]}},{"text" :{"text": ["Aqui ta o link do trailer '+results[i].url+'"]}}';
                    console.log(results[i])
            if ( i < numRows ) {
                  json_texto += ',';
                }
              }

            connection.end();
            json_texto += ']}';
            response.send(json_texto);
          });






  }

// cadastro de usuario


// ---- - - - - - - -- -- - - - - - - - - - - -- - - - - - - - - --- - - - - - - - - - - - - --
else if ( intentName == "trailer"  )
  {
 console.log('Entrou no intent trailer')

    var nome_titulo = request.body.queryResult.parameters['nome-titulo'];

    var query = 'select * from filme where titulo = "'+nome_titulo+'" ';

         connection.query(query, function(error, results, fields) {
          if (error) throw error;

              var numRows = results.length - 1;

              var json_texto = '{"fulfillmentMessages": [';

              for (var i in results) {
                json_texto += '{"card" :{"title": ["'+results[i].titulo+'"],"imageUri": ["'+results[i].imagem+'"],"subtitle": ["'+results[i].genero+'"]}},{"text" :{"text": ["Aqui ta o link do trailer '+results[i].url+'"]}}';
                    console.log(results[i])
            if ( i < numRows ) {
                  json_texto += ',';
                }
              }

            connection.end();
            json_texto += ']}';
            response.send(json_texto);
          });

  }


// ---- - - - - - - -- -- - - - - - - - - - - -- - - - - - - - - --- - - - - - - - - - - - - --



})


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
