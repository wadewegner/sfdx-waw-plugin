# sfdx-oss-plugins [![Build Status](https://travis-ci.org/wadewegner/sfdx-oss-plugin.svg?branch=master)](https://travis-ci.org/wadewegner/sfdx-oss-plugin)

A plugin for the SFDX CLI that makes it easy to consume open source code.

## Setup

1. Install the SDFX CLI.

2. Install npm modules: `npm install`

3. Link the plugin: `sfdx plugins:link .`

## Pull open source into your project

1. Create a new workspace: `sfdx force:workspace:create -n yourname`

2. Get open source: `sfdx trailhead:source:oss -r WadeWegner/Strike-Components -p force-app/main/default/`

## Create a manifest file to add to your open source project

1. Create a manifest: `sfdx trailhead:source:create -p force-app/main/default/`