# sfdx-oss-plugins [![Build Status](https://travis-ci.org/wadewegner/sfdx-oss-plugin.svg?branch=master)](https://travis-ci.org/wadewegner/sfdx-oss-plugin)

A plugin for the SFDX CLI that makes it easy to consume open source code.

[![SFDX OSS command](https://img.youtube.com/vi/p3f-Fk_M-C0/0.jpg)](https://www.youtube.com/watch?v=p3f-Fk_M-C0)

## Setup

1. Install the SDFX CLI.

2. Install npm modules: `npm install`

3. Link the plugin: `sfdx plugins:link .`

## Pull open source into your project

1. Create a new workspace: `sfdx force:workspace:create -n yourname`

2. Get open source: `sfdx wadewegner:source:oss -r WadeWegner/Strike-Components -p force-app/main/default/`

## Create a manifest file to add to your open source project

1. Create a manifest: `sfdx wadewegner:source:create -p force-app/main/default/`
