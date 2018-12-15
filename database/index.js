const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fetcher');

let repoSchema = mongoose.Schema({
  name: { type: String, default: '' },
  html_url: { type: String, default: '' },
  updated: { type: Date, default: Date.now() }
});

let Repo = mongoose.model('fetcher', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log("we are in db");

  var repos = cleanRepos(repos);
  Repo.insertMany(repos, (err,data) => {
    if (err) {
      callback(err);
    } else {
      callback(null,data);
    }

  });

}

let get = (callback) => {
  // TODO: Your code here
  // This function should return the most recent 25
  // record accourding to its update
  // the MongoDB

  Repo.
  find().
  select('name','html_url').
  sort({ updated: -1 }).
  limit(25).
  exec(callback); // where callback is the name of our callback function.

}

let cleanRepos = (arr) => {

  var result = [];

  arr.forEach(repo => {
    var obj = {};
    obj['name'] = repo['name'];
    obj['html_url'] = repo['html_url'];
    result.push(obj);  
  });

  return result;

}

module.exports = {save,get};