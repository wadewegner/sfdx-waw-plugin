const forceUtils = require('../lib/forceUtils.js');
const sObjectHelpers = require('../lib/sobject_helpers.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'trace',
    command: 'create',
    description: 'create trace flag',
    help: 'help text for waw:trace:create',
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
          const debugLevelName = 'clicreated';

          sObjectHelpers.getDebugLevel(debugLevelName, conn, (debugLevelId) => {

            conn.tooling.query(`SELECT Id FROM User WHERE Username = '${targetUsername}'`, (err, res) => {
              const userNameId = res.records[0].Id;

              conn.tooling.sobject('TraceFlag').create({
                DebugLevelId: debugLevelId,
                TracedEntityId: userNameId,
                Workflow: 'INFO',
                Validation: 'INFO',
                Callout: 'INFO',
                ApexCode: 'DEBUG',
                ApexProfiling: 'INFO',
                Visualforce: 'INFO',
                System: 'DEBUG',
                Database: 'INFO',
                LogType: 'USER_DEBUG',
                Wave: 'INFO'
              }, (err, res) => {
                if (err) {
                  return console.error(err.message);
                }
                if (res.success === true) {
                  console.log(res);
                }
              });
            });
          });
        });
      });
    }
  };
}());