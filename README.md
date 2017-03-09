# sfdx-oss-plugins

A plugin for the SFDX CLI that makes it easy to consume open source code.

## Setup

1. Install the SDFX CLI.

2. Install npm modules: `npm install`

3. Link the plugin: `sfdx plugins:link .`

4. Create a new workspace: `sfdx force:workspace:create -n yourname`

5. Get open source: `sfdx heroku:force:source:oss -r WadeWegner/Strike-Components -p force-app/main/default/`