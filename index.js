'use strict';
exports.topic = {
  name: 'force',
  // this is the help text that shows up under `heroku help`
  description: 'an oss command'
}

exports.commands = [
  require('./commands/oss.js')
]