const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  db.save(['ammar','bashar','manal'],(err,data) => {

    if (err) {
      console.log("ERROR cant save recoreds to db");
      res.status(404).end();
    } else {
      res.send("sucessfully saved");
    }
  });
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get((err,data) => {

    if(err) {
      console.log("ERROR cant get recoreds from db");
      res.status(404).end();

    } else {
      res.send(data);
    }
  });
  
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

