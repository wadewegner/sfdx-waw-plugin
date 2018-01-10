const path = require('path');

const almPath = path.dirname(require.resolve('salesforce-alm'));
const Org = require(path.join(almPath, 'lib', 'scratchOrgApi'));
const Force = require(path.join(almPath, 'lib', 'force'));
const ConfigApi = require(path.join(almPath, 'lib', 'configApi')).Config;

const jsforce = require('jsforce');

const defaultConnectedAppInfo = require(path.join(
  almPath,
  'lib',
  'defaultConnectedApp'
));

(function() {
  'use strict';

  module.exports = {
    topic: 'auth',
    command: 'username:login',
    description: 'authorize an org using the username password flow',
    help: 'help text for waw:auth:username:login',
    flags: [
      {
        name: 'instanceurl',
        char: 'r',
        description: 'the login URL of the instance the org lives on',
        hasValue: true,
        required: false
      },
      {
        name: 'username',
        char: 'u',
        description: 'username for org',
        hasValue: true,
        required: true
      },
      {
        name: 'password',
        char: 'p',
        description: 'password for org',
        hasValue: true,
        required: true
      }
    ],
    run(context) {
      const username = context.flags.username;
      const password = context.flags.password;
      let instanceUrl = context.flags.instanceurl;

      if (!instanceUrl) {
        instanceUrl = 'https://login.salesforce.com';
      }

      const saveAsDefault = false;

      const oauthConfig = [];
      oauthConfig.clientId = defaultConnectedAppInfo.clientId;
      oauthConfig.clientSecret = defaultConnectedAppInfo.clientSecret;

      const conn = new jsforce.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl: instanceUrl
      });

      conn.login(username, password, (err, userInfo) => {
        if (err) {
          return console.error(err);
        }

        const orgSaveData = [];
        orgSaveData.orgId = userInfo.organizationId;
        orgSaveData.accessToken = conn.accessToken;
        orgSaveData.instanceUrl = conn.instanceUrl;
        orgSaveData.username = username;
        orgSaveData.loginUrl = instanceUrl;

        const orgApi = new Org(this.force);

        console.log(orgSaveData);

        orgApi.saveConfig(orgSaveData, saveAsDefault);
      });
    }
  };
})();
