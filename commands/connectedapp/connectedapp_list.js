const path = require("path");
const ConnectedApp = require(path.join(__dirname, '..', '..', 'lib', 'connectedapp', 'connectedappApi.js'));

(function() {
    "use strict";
    module.exports = {
        topic: "connectedapp",
        command: "list",
        description: "List the connected apps in your org",
        help: "help text for wadewegner:connected`app:list",
        flags: [
            {
                name: "targetusername",
                char: "u",
                description: "username for the target org",
                hasValue: true
            },
            {
                name: "connectedappname",
                char: "n",
                description: "connected app name",
                hasValue: true,
                required: true
            }
        ],
        run(context) {
            const connectedApp = new ConnectedApp();
            return connectedApp.list(context);
        }
    };
})();
