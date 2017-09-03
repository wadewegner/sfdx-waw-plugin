const forceUtils = require('../lib/forceUtils.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'trace',
    command: 'delete',
    description: 'delete trace flag',
    help: 'help text for waw:trace:delete',
    flags: [{
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    }],
    run(context) {

      const targetUsername = context.flags.targetusername;

      forceUtils.getOrg(targetUsername, (org) => {
        org.force._getConnection(org, org.config).then((conn) => {

          const debugLevelName = 'clicreated';

          conn.tooling.query(`SELECT Id, DeveloperName FROM DebugLevel WHERE DeveloperName = '${debugLevelName}'`, (err, res) => {
            const debugLevelId = res.records[0].Id;

            conn.tooling.destroy('DebugLevel', debugLevelId, (err, res) => {

              if (err) {
                return console.error(err);
              }
              console.log(res);

            });
          });
        });
      });
    }
  };
}());