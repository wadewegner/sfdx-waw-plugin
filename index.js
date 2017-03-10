'use strict';
exports.topic = {
  name: 'source',
  // this is the help text that shows up under `heroku help`
  description: 'source related command'
}

exports.namespace = {
        name: "trailhead",
        description : "community commands from Trailhead"
    };

exports.commands = [
  require('./commands/oss.js')
]

