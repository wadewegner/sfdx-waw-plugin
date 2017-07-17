const path = require('path');
const almPath = path.dirname(require.resolve('salesforce-alm'));
const Project = require(path.join(almPath, 'lib', 'projectDir'));
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'project',
    command: 'pdir:delete',
    description: 'delete a package directory from the project definition',
    help: 'help text for waw:project:pdir:delete',
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

            for (let i = 0; i < projectJson.packageDirectories.length; i++) {
              if (projectJson.packageDirectories[i].path === packageDirectoryPath) {
                // delete projectJson.packageDirectories[i];
                projectJson.packageDirectories.splice(i, 1);
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

        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
}());