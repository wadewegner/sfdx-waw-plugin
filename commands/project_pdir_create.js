const path = require('path');
const fs = require('fs');
const almPath = path.dirname(require.resolve('salesforce-alm'));
const Project = require(path.join(almPath, 'lib', 'projectDir'));
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'project',
    command: 'pdir:create',
    description: 'create a package directory for the project definition',
    help: 'help text for waw:project:pdir:delete',
    flags: [{
      name: 'path',
      char: 'p',
      description: 'path for default package directory',
      hasValue: true
    }, {
      name: 'default',
      char: 'd',
      description: 'sets default',
      required: false,
      hasValue: false,
      type: 'flag'
    }],
    run(context) {

      const packageDirectoryPath = context.flags.path;
      const setDefault = context.flags.default;

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

          if (exists === 1) {
            console.log(`Package directory ${packageDirectoryPath} already exists in your project definition.`);
          } else {

            projectJson.packageDirectories.push({
              path: packageDirectoryPath
            });

            if (setDefault) {
              for (let i = 0; i < projectJson.packageDirectories.length; i++) {
                if (projectJson.packageDirectories[i].path === packageDirectoryPath) {
                  projectJson.packageDirectories[i].default = true;
                } else {
                  delete projectJson.packageDirectories[i].default;
                }
              }
            }

            fs.writeFile(projectJsonPath, JSON.stringify(projectJson, null, 2), (writeErr) => {
              if (writeErr) {
                console.error(writeErr);
              } else {
                console.dir(projectJson);
              }
            });
          }

        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
}());