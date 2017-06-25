const Source = require('../../lib/source/sourceApi.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'source',
    command: 'oss',
    description: 'Easily pulls in open source from a Github repository',
    help: 'help text for wadewegner:source:oss',
    flags: [{
        name: 'repository',
        char: 'r',
        description: 'Git repository (e.g. "wadewegner/Strike-Components")',
        required: true,
        hasValue: true
      },
      {
        name: 'path',
        char: 'p',
        description: 'Path for downloaded source',
        required: true,
        hasValue: true
      },
      {
        name: 'branch',
        char: 'b',
        description: 'Git repository branch (default is "master")',
        required: false,
        hasValue: true
      },
      {
        name: 'server',
        char: 's',
        description: 'Git host server url (default is "github.com")',
        required: false,
        hasValue: true
      }
    ],
    
    run(context) {
      const source = new Source();
      return source.oss(context);
    }

  };
}());
