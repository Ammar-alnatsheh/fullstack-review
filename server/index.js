const express = require('express');
const db = require('../database');
const bodyParser = require('body-parser');
const getReposByUsername = require('../helpers/github');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json()); // for parsing application/json

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var body = JSON.stringify(req.body);
  var userName = JSON.parse(body)['user'];

  getReposByUsername.getReposByUsername(userName,(err,repos => {

    if(err) {
      console.log("ERROR cant get repos from github",err);
      res.status(404).end();

    } else {
      db.save(repos, (err) => {

        if(err) {
          console.log("ERROR cant save repos to database",err);
          res.status(500).send(err);

        } else {
          res.render('index');

        }
      });
    }
  }));
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

