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

      console.log(context.flags.path);

    }
  };
}());