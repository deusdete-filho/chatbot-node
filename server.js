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
    
  var nome_genero = request.body.queryResult.parameteres['nome-genero'];

  var query = 'select * from filme where id = "'+nome_genero+'"';
    
  connection.query(query,function (error, results, fields) {
  if (error) throw error;
    connection.end();});
    
  var id_filme = '';
  var titulo_filme = '';
  var imagem_filme = '';
  var genero_filme = '';
  var url_filme = '';

    id_filme = '+results[0].id+';
    
  
    
  response.json({
  "fulfillmentMessages": [

  ]
  
});
  }
  else   if ( intentName == "indicar-filme - yes"  ) 
  {
  }
  

});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
