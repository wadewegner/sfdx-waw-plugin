const path = require('path');
const fs = require('fs');
const almPath = path.dirname(require.resolve('salesforce-alm'));
const Project = require(path.join(almPath, 'lib', 'projectDir'));
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'package2',
    command: 'project:update',
    description: 'update the sfdx-project.json with package2 info',
    help: 'help text for waw:package2:project:update',
    flags: [{
      name: 'packagedirectory',
      char: 'd',
      description: 'package directory getting updated',
      hasValue: true,
      required: true
    }, {
      name: 'id',
      char: 'i',
      description: 'id of package',
      hasValue: true
    }, {
      name: 'versionnumber',
      char: 'n',
      description: 'version number of package',
      hasValue: true
    }],
    run(context) {

      const packageDirectoryPath = context.flags.packagedirectory;

      try {
        const projectPath = Project.getPath();
        const projectJsonPath = path.join(projectPath, 'sfdx-project.json');

        jsonfile.readFile(projectJsonPath, (err, projectJson) => {

          let exists = 0;

          const packageDirectories = projectJson.packageDirectories;
          packageDirectories.forEach((table) => {
            const tablePath = table.path;
            if (tablePath === packageDirectoryPath) {
              exists = 1;
            }
          });

          if (exists === 0) {
            console.log(`Unable to find ${packageDirectoryPath} in your package directories.`);
          } else {

            const packageId = context.flags.id;
            const versionNumber = context.flags.versionnumber;
            let updated = false;

            for (let i = 0; i < projectJson.packageDirectories.length; i++) {

              if (projectJson.packageDirectories[i].path === packageDirectoryPath) {
                if (packageId) {
                  updated = true;
                  projectJson.packageDirectories[i].id = packageId;
                }
                if (versionNumber) {
                  updated = true;
                  projectJson.packageDirectories[i].versionNumber = versionNumber;
                }
              }
            }

            if (updated) {
              
              fs.writeFile(projectJsonPath, JSON.stringify(projectJson, null, 2), (writeErr) => {
                if (writeErr) {
                  console.error(writeErr);
                } else {
                  console.dir(projectJson);
                }
              });
            }

          }

        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
}());