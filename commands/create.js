const recursive = require('recursive-readdir');
const path = require('path');
const jsonfile = require('jsonfile');

(function () {
  'use strict';

  module.exports = {
    topic: 'source',
    command: 'create',
    description: 'Create a manifest file for your open source project',
    help: 'help text for waw:source:create',
    flags: [{
      name: 'path',
      char: 'p',
      description: 'Path for your source',
      required: true,
      hasValue: true
    }],
    run(context) {

      const dir = context.flags.path;
      const filePathAndName = path.join('.', 'sfdx-oss-manifest.json');
      const json = {
        sfdxSource: true,
        version : '1.0.0',
        files: [
        ]
      };

      recursive(dir, (err, files) => {

        json.files.push(files);
        jsonfile.writeFileSync(filePathAndName, json, { spaces: 2 });
        console.log(`Created file ${filePathAndName}. Be sure to remove files you don't want to include.`); // eslint-disable-line no-console

      });
    }
  };
}());