const oss = require('./commands/oss.js');
const manifestCreate = require('./commands/create.js');
const connectedAppCreate = require('./commands/connectedapp_create.js');
const connectedAppList = require('./commands/connectedapp_list.js');

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

  exports.commands = [oss, manifestCreate, connectedAppCreate, connectedAppList];

}());