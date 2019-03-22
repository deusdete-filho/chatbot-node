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
  
    var query = '';
  
    connection.query(query,function (error, results, fields) {
     if (error) throw error;
     connection.end();
  
  
  var intentName = request.body.queryResult.intent.displayName;
  
  if ( intentName == "indicar-filme"  ) 
  {
  response.json({
  "fulfillmentMessages": [
    {
      "card": {
        "title": "card title",
        "subtitle": "card text",
        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
        "buttons": [
          {
            "text": "Veja o trailer",
            "postback": "https://assistant.google.com/"
          }
        ]
      }
    }
  ]
  
  
  });
  }
  else   if ( intentName == "indicar-filme - yes"  ) 
  {
    var nome_genero = request.body.queryResult.parameteres['nome-genero'];
  }
  

});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
