const forceUtils = require('../lib/forceUtils.js');
const open = require('open');
const fs = require('fs');
const os = require('os');
const path = require('path');
const fse = require('fs-extra');
const url = require('url');

(function() {
  'use strict';

  module.exports = {
    topic: 'workbench',
    command: 'open',
    description: 'open workbench using the current target username',
    help: 'help text for waw:workbench:open',
    flags: [
      {
        name: 'targetusername',
        char: 'u',
        description: 'username for the target org',
        hasValue: true,
        required: false
      },
      {
        name: 'targetworkbenchurl',
        char: 't',
        description: 'target workbench url',
        hasValue: true,
        required: false
      },
      {
        name: 'setdefaultworkbenchurl',
        char: 's',
        description: 'store the workbench url as default',
        hasValue: false,
        required: false
      },
      {
        name: 'urlonly',
        char: 'r',
        description: 'urlonly',
        hasValue: false,
        required: false
      }
    ],
    run(context) {
      // get CLI flags
      let targetUsername = context.flags.targetusername;
      const urlOnly = context.flags.urlonly;
      const setDefaultworkbenchUrl = context.flags.setdefaultworkbenchurl;
      const targetWorkbenchUrl = context.flags.targetworkbenchurl;

      // set defaults
      const home = os.homedir();
      const pluginPath = '.sfdx/vendors/sfdx-waw-plugin';
      const fileName = 'workbench.json';
      const workbenchPath = path.join(home, pluginPath, fileName);

      let workbenchPathExists = false;

      // check to see if a default workbench json file exists
      fs.stat(workbenchPath, (err) => {
        if (!err) {
          workbenchPathExists = true;
        }

        // check to see if we're missing the required workbench url info
        if (!targetWorkbenchUrl && !workbenchPathExists) {
          const output =
            'A default Workbench URL was not found. Please specify with -t|--targetWorkbenchUrl.';
          console.log(output); // eslint-disable-line no-console

          // exit the process
          process.exit(1);
        }

        if (targetWorkbenchUrl) {
          const urlParseResult = url.parse(targetWorkbenchUrl);

          if (!urlParseResult.hostname) {
            console.log(
              'Invalid target workbench url. Please use a valid url.'
            ); // eslint-disable-line no-console
            process.exit(1);
          }
        }

        // store default workbench url if if possible
        if (setDefaultworkbenchUrl) {
          if (targetWorkbenchUrl) {
            const workbench = {
              defaultWorkbenchUrl: targetWorkbenchUrl
            };

            fse.outputFile(
              workbenchPath,
              JSON.stringify(workbench, null, 2),
              (writeErr) => {
                if (writeErr) {
                  console.log('writeErr', writeErr); // eslint-disable-line no-console

                  process.exit(1);
                }

                const output = `Stored ${targetWorkbenchUrl} in ${workbenchPath}.\n`;
                console.log(output); // eslint-disable-line no-console
              }
            );
          } else {
            const output =
              'You need to pass in workbench url with -t|--targetworkbenchurl in order to set as default.';
            console.log(output); // eslint-disable-line no-console

            process.exit(1);
          }
        }

        let workbenchUrl = targetWorkbenchUrl;
        // if we don't have a workbench url, look for a stored default
        if (!workbenchUrl) {
          // load from default
          const workbenchPathJson = require(workbenchPath);
          workbenchUrl = workbenchPathJson.defaultWorkbenchUrl;
        }

        // get target org config
        forceUtils.getOrg(targetUsername, (org) => {
          
          // TODO: confirm this renews the authToken
          org.force.describeData(org).then(() => {
            
            org.getConfig().then(() => {
              targetUsername = org.authConfig.username;

              const accessToken = org.authConfig.accessToken;
              const instanceUrl = org.authConfig.instanceUrl;
              const serverUrl = `${instanceUrl}/services/Soap/u/41.0`;

              const workbenchUrlWithSid = url.resolve(
                workbenchUrl,
                `/login.php?serverUrl=${serverUrl}&sid=${accessToken}`
              );

              if (urlOnly) {
                const output = `Access workbench as user ${targetUsername} with the following URL: ${workbenchUrlWithSid}`;
                console.log(output); // eslint-disable-line no-console
              } else {
                const output = `Opening ${workbenchUrl} and logging into ${targetUsername}.`;
                console.log(output); // eslint-disable-line no-console

                open(workbenchUrlWithSid);
              }
            });
          });
        });
      });
    }
  };
})();
