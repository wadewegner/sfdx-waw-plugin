# sfdx-oss-plugins [![Build Status](https://travis-ci.org/wadewegner/sfdx-oss-plugin.svg?branch=master)](https://travis-ci.org/wadewegner/sfdx-oss-plugin)

A plugin for the SFDX CLI with a number of useful commands.

## Setup

### Install from source

1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:wadewegner/sfdx-oss-plugin.git`

3. Install npm modules: `npm install`

4. Link the plugin: `sfdx plugins:link .`

### Install as plugin

1. Install plugin: `sfdx plugins:install sfdx-oss-plugin`

## Create a Connected App

`sfdx wadewegner:connectedapp:create -u <username|alias> -n <ConnectedAppName`

## List a Connected App

`sfdx wadewegner:connectedapp:list -u <username|alias> -n <ConnectedAppName`

## Pull open source into your project

1. Create a new workspace: `sfdx force:workspace:create -n yourname`

2. Get open source: `sfdx wadewegner:source:oss -r WadeWegner/Strike-Components -p force-app/main/default/`

## Create a manifest file to add to your open source project

1. Create a manifest: `sfdx wadewegner:source:create -p force-app/main/default/`
