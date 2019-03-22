const express = require('express');
const app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
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
    
if ( intentName == "indicar-filme"  ) 
  {
 console.log('Entrou no intent -> indicar-filme')  
  
    var nome_genero = request.body.queryResult.parameters['nome-genero'];
    var query = 'select * from filme where id = "'+nome_genero+'"';
    
    connection.query(query, function (error, results, fields) {
  
       if (error) throw error;
       connection.end();
       var contato =  '';
       contato = 'ID =>'+results[0].id+'- Titulo =>'+results[0].titulo+'-Ano =>'+results[0].ano;
       response.json({"fulfillmentText" : contato })
    })     

    
  }
  
  else if ( intentName == "lancamentos"  ) 
  {console.log('Entrou no intent -> lancamentos')  
  
   response.json({
     "fulfillmentMessages" : [
              {
                "card": {
                  "title": "Processo Seletivo",
                  "subtitle": "Bem vindo ao nosso processo seletivo",
                  "imageUri": "https://firebasestorage.googleapis.com/v0/b/universidade-3d7f8.appspot.com/o/processo%2Fprocesso-seletivo.png?alt=media&token=d5a89cec-1c07-4dad-9b44-7aaf098128bd"
                }
              },
              {
                "text" :{
                   "text": [
                      "Voce quer participar do processo seletivo ?"
                  ]
                }
              }
            ]
     });
  
  } // fim do else
    
  else if ( intentName == "lancamentos - yes"  ) 
  {console.log('Entrou no intent -> lancamentos sim ')  
  
   response.json({
     "fulfillmentMessages" : [
              {
                "text" :{
                   "text": [
                      "To procurando os lancamentos"
                  ]
                }
              }
            ]
     });
  
  } // fim do else
  
  
    else if ( intentName == "bom-filme"  ) 
  {console.log('Entrou no intent -> bom - filme ')  
  
   response.json({
     "fulfillmentMessages" : [
              {
                "text" :{
                   "text": [
                      "To procurando os lancamentos"
                  ]
                }
              }
            ]
     });
  
  } // fim do else
  
  
  
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
