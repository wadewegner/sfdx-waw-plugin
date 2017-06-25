'use strict';

const path = require('path');

const messages = require(path.join(__dirname, '..', '..', 'lib', 'messages'))();

module.exports = function () {
    return {
    	name: "source",
        description: messages.getMessage('mainTopicDescriptionHelp', [], 'source'),
        longDescription:  messages.getMessage('mainTopicLongDescriptionHelp', [], 'source')
    };
};