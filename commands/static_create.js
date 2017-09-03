const forceUtils = require('../lib/forceUtils.js');
const {
  exec
} = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');

(function () {
  'use strict';

  module.exports = {
    topic: 'static',
    command: 'create',
    description: 'create a generic static resource',
    help: 'help text for waw:static:create',
    flags: [{
      name: 'name',
      char: 'n',
      description: 'static resource name',
      hasValue: true,
      required: true
    }, {
      name: 'type',
      char: 't',
      description: 'static resource type (application/javascript, text/javascript, application/xml, text/xml, text/css, text/plain, etc.)',
      hasValue: true,
      required: true
    }, {
      name: 'outputdir',
      char: 'd',
      description: 'folder for saving the created files',
      hasValue: true,
      required: true
    }, {
      name: 'targetusername',
      char: 'u',
      description: 'username for the target org',
      hasValue: true
    }],
    run(context) {

      let targetUsername = context.flags.targetusername;
      const name = context.flags.name;
      const staticType = context.flags.type;
      const outputdir = context.flags.outputdir;

      forceUtils.getOrg(targetUsername, (org) => {
        org.force._getConnection(org, org.config).then((conn) => {

          targetUsername = org.authConfig.username;
          const staticText = `<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Private</cacheControl>
    <contentType>${staticType}</contentType>
</StaticResource>`;


          let resourceMetaFile = path.join(outputdir, `${name}.resource-meta.xml`);
          let resourceFile = path.join(outputdir, `${name}.resource`);
          const filePath = path.dirname(resourceMetaFile);

          fse.ensureDirSync(filePath);
          const resourceMetaFileLocal = fs.createWriteStream(resourceMetaFile);
          const resourceFileLocal = fs.createWriteStream(resourceFile);
          
          fs.writeFile(resourceMetaFile, staticText, (err) => {
              if (err) {
                  return console.log(err);
              }
          
              console.log(`Your resource files were created:\n\n${resourceFile}\n${resourceMetaFile}`);
          }); 

        });
      });
    }
  };
}());