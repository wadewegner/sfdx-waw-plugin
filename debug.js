'use strict';
const path = require('path');
const parser = require('./lib/cmdParser.js');
const root = require('./index.js');

const command = parser.parseCommand(root, process.argv);

const start = (new Date()).getTime();
command.cmd.run({ cmd:command.cmd.command, flags:command.flags });

