const oss = require('./commands/oss.js');
const manifestCreate = require('./commands/create.js');

(function () {
  'use strict';

  exports.topic = {
    name: 'source',
    description: 'source related command'
  };

  exports.namespace = {
    name: 'trailhead',
    description: 'community commands from Trailhead'
  };

  exports.commands = [oss, manifestCreate];
  
}());