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

  var intentName = request.body.queryResult.intent.displayName;
  
    if ( intentName == "indicar-filme"  ) 
  {
  
  
          var nomeid ='id';

           response.json({"fulfillmentText": nomeid})

  }

});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
