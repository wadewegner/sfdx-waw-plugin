const oss = require('./commands/oss.js');
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
const apexLogLatest = require('./commands/apex_log_latest.js');
const staticCreate = require('./commands/static_create.js');
const orgShare = require('./commands/org_share.js');

(function () {
  'use strict';

  exports.topics = [{
    name: 'source',
    description: 'commands for source'
  },{
    name: 'connectedapp',
    description: 'commands for connected apps'
  },{
    name: 'project',
    description: 'commands for projects'
  },{
    name: 'trace',
    description: 'commands for trace flags'
  },{
    name: 'apex',
    description: 'commands for apex'
  },{
    name: 'static',
    description: 'commands for static resources'
  },{
    name: 'org',
    description: 'commands for org resources'
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
    traceDelete,
    apexLogLatest,
    staticCreate,
    orgShare
  ];

}());