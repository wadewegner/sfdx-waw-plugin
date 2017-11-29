const forceUtils = require('../lib/forceUtils.js');
const request = require('request');

(function () {
  'use strict';

  module.exports = {
    topic: 'codeclean',
    command: 'check',
    description: 'check the status of the code clean service running against your org',
    help: 'help text for waw:codeclean:check',
    flags: [{
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    }, {
      name: 'id',
      char: 'i',
      description: 'job id for the code clean service',
      hasValue: true,
      required: true
    }],
    run(context) {

      let targetUsername = context.flags.targetusername;
      let jobId = context.flags.id;

      forceUtils.getOrg(targetUsername, (org) => {

        targetUsername = org.authConfig.username;

        const checkApi = `https://sfcodeclean.herokuapp.com/api/job/status/${jobId}`;

        const options = {
          uri: checkApi,
          method: 'GET'
        };

        request.get(options,
          (error, response, body) => {

            if (error) {
              console.log('ERROR', error);
            }

            console.log(body);
          }
        );
      });
    }
  };
}());