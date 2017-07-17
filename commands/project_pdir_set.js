const path = require('path');
const almPath = path.dirname(require.resolve('salesforce-alm'));
const Project = require(path.join(almPath, 'lib', 'projectDir'));
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'project',
    command: 'pdir:set',
    description: 'set the default package directory',
    help: 'help text for waw:project:pdir:set',
    flags: [{
      name: 'path',
      char: 'p',
      description: 'path for default package directory',
      hasValue: true
    }],
    run(context) {

      const packageDirectoryPath = context.flags.path;

      try {
        const projectPath = Project.getPath();
        const projectJsonPath = path.join(projectPath, 'sfdx-project.json');

        jsonfile.readFile(projectJsonPath, (err, projectJson) => {

          let exists = 0;
          let alreadyDefault = false;

          const packageDirectories = projectJson.packageDirectories;
          packageDirectories.forEach((table) => {
            const tablePath = table.path;
            if (tablePath === packageDirectoryPath) {
              exists = 1;
              const isDefault = table.default;

              if (isDefault) {
                if (isDefault === true) {
                  alreadyDefault = true;
                }
              }
            }
          });

          if (exists === 0) {
            console.log(`Unable to find ${packageDirectoryPath} in your package directories.`);
          } else {
            if (alreadyDefault) {
              console.log('This package directory is already set as the default.');
            } else {

              for (let i = 0; i < projectJson.packageDirectories.length; i++) {
                if (projectJson.packageDirectories[i].path === packageDirectoryPath) {
                  projectJson.packageDirectories[i].default = true;
                } else {
                  delete projectJson.packageDirectories[i].default;
                }
              }

              jsonfile.writeFile(projectJsonPath, projectJson, (writeErr) => {
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