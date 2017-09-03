const forceUtils = require('../lib/forceUtils.js');
const {
  exec
} = require('child_process');

(function () {
  'use strict';

  module.exports = {
    topic: 'apex',
    command: 'log:latest',
    description: 'get the latest apex log',
    help: 'help text for waw:apex:log:latest',
    flags: [{
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    }],
    run(context) {

      let targetUsername = context.flags.targetusername;

      forceUtils.getOrg(targetUsername, (org) => {
        org.force._getConnection(org, org.config).then((conn) => {

          targetUsername = org.authConfig.username;

          const apexLogListCommand = `sfdx force:apex:log:list -u ${targetUsername} --json`;

          exec(apexLogListCommand, (err, stdout, stderr) => {
            if (stderr && err) {
              console.log('apexLogListCommand:stderr', stderr);
              return;
            }

            const apexLogListJsonOut = JSON.parse(stdout);

            if (apexLogListJsonOut.status === 0) {
              
              if (apexLogListJsonOut.result.length > 0) {

                const logId = apexLogListJsonOut.result[apexLogListJsonOut.result.length - 1].Id;
                const apexLogGetByIdCommand = `sfdx force:apex:log:get -i ${logId} -u ${targetUsername}`;

                exec(apexLogGetByIdCommand, (err, stdout, stderr) => {
                  if (stderr && err) {
                    console.log('apexLogListCommand:stderr', stderr);
                    return;
                  }

                  console.log(stdout);
                });
              }
            }
          });
        });
      });
    }
  };
}());