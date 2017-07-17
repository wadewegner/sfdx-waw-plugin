const path = require('path');
const almPath = path.dirname(require.resolve('salesforce-alm'));
const Project = require(path.join(almPath, 'lib', 'projectDir'));
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'project',
    command: 'display',
    description: 'display the details of the project',
    help: 'help text for waw:project:details',
    flags: [{
      name: 'packageDirectories',
      char: 'p',
      description: 'list package directories',
      required: false,
      hasValue: false,
      type: 'flag'
    }],
    run(context) {

      const packageDirectories = context.flags.packageDirectories;

      try {
        const projectPath = Project.getPath();
        const projectJsonPath = path.join(projectPath, 'sfdx-project.json');

        jsonfile.readFile(projectJsonPath, (err, projectJson) => {

          if (packageDirectories) {
            console.log(projectJson.packageDirectories);
          } else {
            console.dir(projectJson);
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    }
  };
}());