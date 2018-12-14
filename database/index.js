const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  updated: { type: Date, default: Date.now() }
});

let Repo = mongoose.model('fetcher', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  
  repos.forEach(record => {
    // apply an insert query to each repo 
    Repo.create({ name: record }, function (err) {

      if (err)  callback(err);
    });
    callback(null);

  });
}

let get = (callback) => {
  // TODO: Your code here
  // This function should return the most recent 25
  // record accourding to its update
  // the MongoDB

  Repo.
  find().
  sort({ updated: -1 }).
  limit(25).
  select('name').
  exec(callback); // where callback is the name of our callback function.

}

module.exports = {save,get};