const forceUtils = require('../lib/forceUtils.js');
const request = require('request');

(function () {
  'use strict';

  module.exports = {
    topic: 'codeclean',
    command: 'start',
    description: 'start the code clean service against your org',
    help: 'help text for waw:codeclean:start',
    flags: [{
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    }],
    run(context) {

      let targetUsername = context.flags.targetusername;

      forceUtils.getOrg(targetUsername, (org) => {

        targetUsername = org.authConfig.username;

        const accessToken = org.authConfig.accessToken;
        const instanceUrl = org.authConfig.instanceUrl;

        const startApi = 'https://sfcodeclean.herokuapp.com/api/job/';

        const data = {
          accessToken: accessToken,
          instanceUrl: instanceUrl
        };

        var options = {
          uri: startApi,
          method: 'POST',
          json: data
        };
        
        request.post(options,
          function (error, response, body) {

            if (error) {
              console.log('ERROR', error);
            }

            if (!error && response.statusCode == 200) {
              console.log(JSON.stringify(body));
            }
          }
        );
      });
    }
  };
}());