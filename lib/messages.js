// TODO - externalize util
const util = require('util');

const TARGET_USERNAME_PARAM = 'targetusername';

const messages = {
    default: {
        en_US: {
            // errors
            // help
            mainTopicDescriptionHelp: 'Replace with your topic description.'
        }
    },

    connectedapp: {
        en_US: {
            mainTopicDescriptionHelp: 'Utility to create and list connected apps',
            mainTopicLongDescriptionHelp: 'Utility to create and list connected apps specifically for use with Salesforce DX'
        }
    },

    source: {
        en_US: {
            mainTopicDescriptionHelp: 'Utility for source related commands',
            mainTopicLongDescriptionHelp: 'Used for the creation of manifest files and pulling in Git repos'
        }
    },

 };

const _getLocale = function() {
    return 'en_US';
};

module.exports = function(locale = _getLocale()) {
    return {
        getMessage(label, args, bundle = 'default') {
            //console.log(bundle);
            const bundleLocale = messages[bundle][locale];

            if (util.isNullOrUndefined(bundleLocale)) {
                return null;
            }

            if (util.isNullOrUndefined(bundleLocale[label])) {
                throw new Error(util.format(bundleLocale.UndefinedLocalizationLabel, bundle, label, locale));
            }

            if (util.isNullOrUndefined(args)) {
                return bundleLocale[label];
            } else {
                const everyone = [].concat(bundleLocale[label], args);
                return util.format(...everyone);
            }
        },

        getLocale() {
            return _getLocale();
        },

        get targetusername() {
            return TARGET_USERNAME_PARAM;
        }
    };
};
