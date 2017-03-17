const recursive = require('recursive-readdir');
const path = require('path');
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'source',
    command: 'create',
    description: 'Create a manifest file for your open source project',
    help: 'help text for force:source:manifest:create',
    flags: [{
      name: 'path',
      char: 'p',
      description: 'Path for your source',
      required: true,
      hasValue: true
    }],
    run(context) {

      const dir = context.flags.path;

      let json = {
        sfdxSource: true,
        version : '1.0.0',
        files: [
        ]
      };

      recursive(dir, (err, files) => {

        // console.log(file);
        json.files.push(files);
        // console.log(json);

        const filePathAndName = path.join('.', 'sfdx-oss-manifest.json');
        
        jsonfile.writeFileSync(filePathAndName, json, {spaces: 2});

        console.log(`Created file ${filePathAndName}`);

      });

      
    }
  };
}());