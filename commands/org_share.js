const forceUtils = require('../lib/forceUtils.js');
const request = require('request');

(function () {
  'use strict';

  module.exports = {
    topic: 'org',
    command: 'share',
    description: 'share a scratch org with someone via email',
    help: 'help text for waw:org:share',
    flags: [{
        name: 'targetusername',
        char: 'u',
        description: 'username for the target org',
        hasValue: true,
        required: false
      },
      {
        name: 'emailaddress',
        char: 'e',
        description: 'email address of the scratch org recipient',
        hasValue: true,
        required: true
      }
    ],
    run(context) {

      let targetUsername = context.flags.targetusername;
      const emailAddress = context.flags.emailaddress;

      forceUtils.getOrg(targetUsername, (org) => {
        org.getConfig().then((orgData) => {

          targetUsername = org.authConfig.username;

          // get front door url (and refresh access token)
          org.force.getOrgFrontDoor(org).then((frontDoorUrlForOrg) => {

            const devHubUsername = orgData.devHubUsername;

            forceUtils.getOrg(devHubUsername, (hubOrg) => {

              // refresh hub org access token
              hubOrg.force.getOrgFrontDoor(hubOrg).then(() => {

                hubOrg.getConfig().then((hubOrgData) => {

                  const accessToken = hubOrgData.accessToken;
                  const instanceUrl = hubOrgData.instanceUrl;
                  const jsonBody =
                    `{ "inputs" :
                      [{
                        "emailBody" : "${devHubUsername} has created you a Salesforce org. Here's your login URL: ${frontDoorUrlForOrg}. Keep this URL confidential and do not share with others.",
                        "emailAddresses" : "${emailAddress}",
                        "emailSubject" : "${devHubUsername} created you a new Salesforce org",
                        "senderType" : "CurrentUser"
                      }]
                    }`;

                  const options = {
                    method: 'post',
                    body: JSON.parse(jsonBody),
                    json: true,
                    url: `${instanceUrl}/services/data/v36.0/actions/standard/emailSimple`,
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json'
                    }
                  };

                  request(options, (err, res, body) => {
                    if (err) {
                      console.log('Error :', err); // eslint-disable-line no-console
                    }
                    console.log(`Successfully shared ${targetUsername} with ${emailAddress}.`); // eslint-disable-line no-console
                  });
                });
              });
            });
          });
        });
      });
    }
  };
}());