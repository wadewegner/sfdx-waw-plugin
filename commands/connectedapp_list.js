const path = require('path');
const os = require('os');
const forceUtils = require('../lib/forceUtils.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'connectedapp',
    command: 'list',
    description: 'List the connected apps in your org',
    help: 'help text for wadewegner:connected`app:list',
    flags: [
      {
        name: 'targetusername',
        char: 'u',
        description: 'username for the target org',
        hasValue: true
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

      forceUtils.getOrg(targetUsername, (org) => {
        org.force._getConnection(org, org.config).then((conn) => {

          conn.metadata.read('ConnectedApp', connectedappname, (readErr, metadataResult) => {
            console.log(metadataResult); // eslint-disable-line no-console
          });
        });
      });
    }
  };
}());