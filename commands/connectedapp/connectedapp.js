'use strict';

const path = require('path');

const messages = require(path.join(__dirname, '..', '..', 'lib', 'messages'))();

module.exports = function () {
    return {
    	name: "connectedapp",
        description: messages.getMessage('mainTopicDescriptionHelp', [], 'connectedapp'),
        longDescription:  messages.getMessage('mainTopicLongDescriptionHelp', [], 'connectedapp')
    };
};