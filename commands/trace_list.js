const forceUtils = require('../lib/forceUtils.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'trace',
    command: 'list',
    description: 'list trace flags',
    help: 'help text for waw:trace:list',
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
          conn.tooling.query('SELECT Id, CreatedDate, TracedEntityId, ExpirationDate, Workflow, Validation, Callout, ApexCode, ApexProfiling, Visualforce, System, Database, DebugLevelId, LogType, Wave FROM TraceFlag', (err, res) => {
            console.log(res.records);
          });
        });
      });
    }
  };
}());