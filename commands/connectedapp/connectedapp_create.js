const path = require("path");
const ConnectedApp = require(path.join(__dirname, '..', '..', 'lib', 'connectedapp', 'connectedappApi.js'));

(function() {
    "use strict";
    module.exports = {
        topic: "connectedapp",
        command: "create",
        description: "Create a connected app in your org",
        help: "help text for wadewegner:connectedapp:create",
        flags: [
            {
                name: "targetusername",
                char: "u",
                description: "username or alias for the target org",
                hasValue: true
            },
            {
                name: "name",
                char: "n",
                description: "connected app name",
                hasValue: true,
                required: true
            },
            {
                name: "certificate",
                char: "r",
                description: "create and register a certificate",
                required: false,
                hasValue: false,
                type: "flag"
            },
            {
                name: "callbackurl",
                char: "c",
                description: 'callbackUrl (default is "sfdx://success")',
                hasValue: true,
                required: false
            },
            {
                name: "description",
                char: "d",
                description: "connected app description",
                hasValue: true,
                required: false
            },
            {
                // Basic,Api,Web,Full,Chatter,CustomApplications,RefreshToken,OpenID,CustomPermissions,Wave,Eclair
                name: "scopes",
                char: "s",
                description:
                    "scopes separated by commas (defaut: Basic, Api, Web, RefreshToken; valid: Basic, Api, Web, Full, Chatter, CustomApplications, RefreshToken, OpenID, CustomPermissions, Wave, Eclair)",
                hasValue: true,
                required: false
            }
        ],
        run(context) {
            const connectedApp = new ConnectedApp();
            return connectedApp.create(context);
        }
    };
})();
