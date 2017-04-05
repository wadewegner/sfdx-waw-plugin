const path = require('path');
const os = require('os');
const ScratchOrg = require(path.join(os.homedir(), '.local/share/heroku/plugins/node_modules/salesforce-alm/lib/scratchOrgApi'));
const forceUtils = require('../lib/forceUtils.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'connectedapp',
    command: 'list',
    description: 'List the connected apps in your org',
    help: 'help text for wadewegner:connectedapp:list',
    flags: [
      {
        name: 'targetusername',
        char: 'u',
        description: 'username for the target org',
        hasValue: true,
        required: true
      },
      {
        name: 'connectedappname',
        char: 'n',
        description: 'connected app name',
        hasValue: true,
        required: true
      }],
    run(context) {

      const targetUsername = context.flags.targetusername;
      const connectedappname = context.flags.connectedappname;

      forceUtils.getUsername(targetUsername, (username) => {

        ScratchOrg.create(username).then(org => {
          org.force._getConnection(org, org.config).then((conn) => {

            conn.metadata.read('ConnectedApp', connectedappname, (readErr, metadataResult) => {
              console.log(metadataResult); // eslint-disable-line no-console
            });
          });
        });
      });
    }
  };
}());