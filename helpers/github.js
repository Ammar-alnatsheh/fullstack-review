const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName, callabck) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  console.log("in github");
  let options = {
    url: `https://api.github.com/${userName}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  

}

module.exports.getReposByUsername = getReposByUsername;