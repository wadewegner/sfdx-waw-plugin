const oss = require('./commands/source/oss.js');
const manifestCreate = require('./commands/source/create.js');
const connectedAppCreate = require('./commands/connectedapp/connectedapp_create.js');
const connectedAppList = require('./commands/connectedapp/connectedapp_list.js');
const connectedAppTopic = require('./commands/connectedapp/connectedapp.js');
const sourceTopic = require('./commands/source/source.js');

(function () {
  'use strict';

  exports.topics = [sourceTopic(),connectedAppTopic()];

  exports.namespace = {
    name: 'wadewegner',
    description: 'OSS commands from Wade Wegner'
  };

  exports.commands = [oss, manifestCreate, connectedAppCreate, connectedAppList];

}());