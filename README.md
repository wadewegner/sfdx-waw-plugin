# sfdx-waw-plugins [![Build Status](https://travis-ci.org/wadewegner/sfdx-waw-plugin.svg?branch=master)](https://travis-ci.org/wadewegner/sfdx-waw-plugin)

A plugin for the Salesforce CLI built by Wade Wegner and containing a lot of helpful commands.

## Setup

### Install from source

1. Install the SDFX CLI.

2. Clone the repository: `git clone git@github.com:wadewegner/sfdx-waw-plugin.git`

3. Install npm modules: `npm install`

4. Link the plugin: `sfdx plugins:link .`

### Install as plugin

1. Install plugin: `sfdx plugins:install sfdx-waw-plugin`

## Create a Connected App

Simple example: `sfdx waw:connectedapp:create -u <username|alias> -n <ConnectedAppName>`

With a self-signed certificate: `sfdx waw:connectedapp:create -u <username|alias> -n <ConnectedAppName> -r`

Lots of options available:

```
-> sfdx waw:connectedapp:create --help
Usage: sfdx waw:connectedapp:create

Create a connected app in your org

 -c, --callbackurl CALLBACKURL       # callbackUrl (default is "sfdx://success")
 -r, --certificate                   # create and register a certificate
 -d, --description DESCRIPTION       # connected app description
 -n, --name NAME                     # connected app name
 -s, --scopes SCOPES                 # scopes separated by commas (defaut: Basic, Api, Web, Refresh; valid: Basic, Api, Web, Full, Chatter, CustomApplications, RefreshToken, OpenID, CustomPermissions, Wave, Eclair)
 -u, --targetusername TARGETUSERNAME # username or alias for the target org
```

## List a Connected App

List a Connected App: `sfdx waw:connectedapp:list -u <username|alias> -n <ConnectedAppName>`

## Display the details of the project

Display project: `sfdx waw:project:display`

Display package directories: `sfdx waw:project:display -p`

## Set a default package directory

Set default package: `sfdx waw:project:pdir:set -p <directory>`

## Create a package directory in the project file

Create: `sfdx waw:project:pdir:create -p <directory>`

Create as default: `sfdx waw:project:pdir:create -p <directory> -d`

## Delete a package directory in the project file

Delete: `sfdx waw:project:pdir:delete -p <directory>`

## Pull open source into your project

1. Create a new workspace: `sfdx force:workspace:create -n yourname`

2. Get open source: `sfdx waw:source:oss -r WadeWegner/Strike-Components -p force-app/main/default/`

## Create a manifest file to add to your open source project

1. Create a manifest: `sfdx waw:source:create -p force-app/main/default/`

## List all trace flags

`sfdx waw:trace:list`
`sfdx waw:trace:list -u <targetusername>`

## Create a trace flag

`sfdx waw:trace:create`
`sfdx waw:trace:create -u <targetusername>`

## Delete the trace flag

`sfdx waw:trace:delete`
`sfdx waw:trace:delete -u <targetusername>`
