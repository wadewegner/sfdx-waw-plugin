const path = require('path');
const Source = require(path.join(__dirname, '..', '..', 'lib', 'source', 'sourceApi.js'));


(function () {
    'use strict';

    module.exports = {
        topic: 'source',
        command: 'create',
        description: 'Create a manifest file for your open source project',
        help: 'help text for wadewegner:source:create',
        flags: [{
            name: 'path',
            char: 'p',
            description: 'Path for your source',
            required: true,
            hasValue: true
        }],

        run(context) {
            const source = new Source();
            return source.create(context);
        }
    };
    
}());
