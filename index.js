const oss = require('./commands/oss.js');
const manifestCreate = require('./commands/create.js');
const connectedApp = require('./commands/connectedapp.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'source',
    description: 'source related command'
  }, {
    name: 'connectedapp',
    description: 'commands related to connected apps'
  }];

  exports.namespace = {
    name: 'wadewegner',
    description: 'OSS commands from Wade Wegner'
  };

  exports.commands = [oss, manifestCreate, connectedApp];

}());