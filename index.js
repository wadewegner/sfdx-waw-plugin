const
oss
= require('./commands/oss.js');
const manifestCreate = require('./commands/create.js');
const projectDisplay = require('./commands/project_display.js');
const projectPDirSet = require('./commands/project_pdir_set.js');
const projectPDirCreate = require('./commands/project_pdir_create.js');
const projectPDirDelete = require('./commands/project_pdir_delete.js');
const connectedAppCreate = require('./commands/connectedapp_create.js');
const connectedAppList = require('./commands/connectedapp_list.js');
const traceList = require('./commands/trace_list.js');
const traceCreate = require('./commands/trace_create.js');
const traceDelete = require('./commands/trace_delete.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'source',
    description: 'source related command'
  },{
    name: 'connectedapp',
    description: 'commands related to connected apps'
  },{
    name: 'project',
    description: 'commands related to projects'
  },{
    name: 'trace',
    description: 'commands for trace flags'
  }];

  exports.namespace = {
    name: 'waw',
    description: 'Various commands from Wade Wegner'
  };

  exports.commands = [
    oss, 
    manifestCreate, 
    projectDisplay, 
    projectPDirSet,
    projectPDirCreate,
    projectPDirDelete,
    connectedAppCreate,
    connectedAppList,
    traceList,
    traceCreate,
    traceDelete
  ];

}());