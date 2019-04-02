# sfdx-waw-plugin

A plugin for the Salesforce CLI built by Wade Wegner and containing a lot of helpful commands.

## Setup
### Install from source
1. Install the SDFX CLI.
1. Clone the repository: `git clone git@github.com:wadewegner/sfdx-waw-plugin.git`
1. Install npm modules: `npm install`
1. Link the plugin: `sfdx plugins:link .`

### Install as plugin
1. Install plugin: `sfdx plugins:install sfdx-waw-plugin`

<!-- toc -->
* [sfdx-waw-plugin](#sfdx-waw-plugin)
<!-- tocstop -->

<!-- commands -->
* [`sfdx waw:apex:log:latest [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawapexloglatest--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:auth:username:login [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawauthusernamelogin---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:codeclean:check [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawcodecleancheck---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:codeclean:results [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawcodecleanresults---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:codeclean:start [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawcodecleanstart--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:connectedapp:create -n <string> [-l <string>] [-r] [-c <string>] [-d <string>] [-s <string>] [-e <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawconnectedappcreate--n-string--l-string--r--c-string--d-string--s-string--e-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:connectedapp:list -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawconnectedapplist--n-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:org:share -e <email> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-waworgshare--e-email--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:package2:update -d <string> [-i <id>] [-n <string>] [-v <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawpackage2update--d-string--i-id--n-string--v-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:project:display [-p] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawprojectdisplay--p---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:project:pdir:create [-p <string>] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawprojectpdircreate--p-string--d---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:project:pdir:delete [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawprojectpdirdelete--p-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:project:pdir:set [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawprojectpdirset--p-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:source:create -p <string> [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawsourcecreate--p-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:source:oss -r <string> -p <string> [-b <string> | -t <string>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawsourceoss--r-string--p-string--b-string---t-string--s-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:static:create -n <string> -t <string> -d <directory> [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawstaticcreate--n-string--t-string--d-directory---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:trace:create [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawtracecreate--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:trace:delete [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawtracedelete--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:trace:list [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawtracelist--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)
* [`sfdx waw:workbench:open [-s <string> -t <string>] [-r <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`](#sfdx-wawworkbenchopen--s-string--t-string--r-string--u-string---apiversion-string---json---loglevel-tracedebuginfowarnerrorfatal)

## `sfdx waw:apex:log:latest [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

get the latest apex log

```
USAGE
  $ sfdx waw:apex:log:latest [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/apex/log/latest.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/apex/log/latest.ts)_

## `sfdx waw:auth:username:login [--json] [--loglevel trace|debug|info|warn|error|fatal]`

authorize an org using the username password flow

```
USAGE
  $ sfdx waw:auth:username:login [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/auth/username/login.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/auth/username/login.ts)_

## `sfdx waw:codeclean:check [--json] [--loglevel trace|debug|info|warn|error|fatal]`

check the status of the code clean service running against your org

```
USAGE
  $ sfdx waw:codeclean:check [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/codeclean/check.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/codeclean/check.ts)_

## `sfdx waw:codeclean:results [--json] [--loglevel trace|debug|info|warn|error|fatal]`

get the results of the code clean service running against your org

```
USAGE
  $ sfdx waw:codeclean:results [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/codeclean/results.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/codeclean/results.ts)_

## `sfdx waw:codeclean:start [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

check the status of the code clean service running against your org

```
USAGE
  $ sfdx waw:codeclean:start [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/codeclean/start.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/codeclean/start.ts)_

## `sfdx waw:connectedapp:create -n <string> [-l <string>] [-r] [-c <string>] [-d <string>] [-s <string>] [-e <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

create a connected app in your org

```
USAGE
  $ sfdx waw:connectedapp:create -n <string> [-l <string>] [-r] [-c <string>] [-d <string>] [-s <string>] [-e 
  <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -c, --callbackurl=callbackurl                   callbackUrl (default is "sfdx://success")
  -d, --description=description                   connected app description
  -e, --contactemail=contactemail                 connected app contact email
  -l, --label=label                               connected app label
  -n, --name=name                                 (required) connected app name
  -r, --certificate                               create and register a certificate

  -s, --scopes=scopes                             scopes separated by commas (defaut: Basic, Api, Web, RefreshToken;
                                                  valid: Basic, Api, Web, Full, Chatter, CustomApplications,
                                                  RefreshToken, OpenID, CustomPermissions, Wave, Eclair)

  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org

  --apiversion=apiversion                         override the api version used for api requests made by this command

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/connectedapp/create.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/connectedapp/create.ts)_

## `sfdx waw:connectedapp:list -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

list the connected apps in your org

```
USAGE
  $ sfdx waw:connectedapp:list -n <string> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -n, --connectedappname=connectedappname         (required) connectedapp.list.flags.connectedappname
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/connectedapp/list.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/connectedapp/list.ts)_

## `sfdx waw:org:share -e <email> [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

share a scratch org with someone via email

```
USAGE
  $ sfdx waw:org:share -e <email> [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -e, --emailaddress=emailaddress                 (required) email address of the scratch org recipient
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/org/share.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/org/share.ts)_

## `sfdx waw:package2:update -d <string> [-i <id>] [-n <string>] [-v <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

update the sfdx-project.json with package2 info

```
USAGE
  $ sfdx waw:package2:update -d <string> [-i <id>] [-n <string>] [-v <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -d, --packagedirectory=packagedirectory         (required) package directory getting updated
  -i, --id=id                                     id of package
  -n, --versionnumber=versionnumber               version number of package
  -v, --versionname=versionname                   version name of package
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/package2/update.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/package2/update.ts)_

## `sfdx waw:project:display [-p] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

```
USAGE
  $ sfdx waw:project:display [-p] [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -p, --packagedirectories                        list package directories
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/project/display.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/project/display.ts)_

## `sfdx waw:project:pdir:create [-p <string>] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

create a package directory for the project definition

```
USAGE
  $ sfdx waw:project:pdir:create [-p <string>] [-d] [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -d, --default                                   sets default
  -p, --path=path                                 path for default package directory
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/project/pdir/create.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/project/pdir/create.ts)_

## `sfdx waw:project:pdir:delete [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

delete a package directory from the project definition

```
USAGE
  $ sfdx waw:project:pdir:delete [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -p, --path=path                                 path for default package directory
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/project/pdir/delete.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/project/pdir/delete.ts)_

## `sfdx waw:project:pdir:set [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

set the default package directory

```
USAGE
  $ sfdx waw:project:pdir:set [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -p, --path=path                                 path for default package directory
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/project/pdir/set.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/project/pdir/set.ts)_

## `sfdx waw:source:create -p <string> [--json] [--loglevel trace|debug|info|warn|error|fatal]`

create a manifest file for your open source project

```
USAGE
  $ sfdx waw:source:create -p <string> [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -p, --path=path                                 (required) path for your source
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/source/create.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/source/create.ts)_

## `sfdx waw:source:oss -r <string> -p <string> [-b <string> | -t <string>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

sasily pulls in open source from a Github repository

```
USAGE
  $ sfdx waw:source:oss -r <string> -p <string> [-b <string> | -t <string>] [-s <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -b, --branch=branch                             [default: master] git repository branch
  -p, --path=path                                 (required) path for downloaded source
  -r, --repository=repository                     (required) git repository (e.g. "wadewegner/Strike-Components")
  -s, --server=server                             [default: github.com] git host server url
  -t, --tag=tag                                   git repository tag
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/source/oss.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/source/oss.ts)_

## `sfdx waw:static:create -n <string> -t <string> -d <directory> [--json] [--loglevel trace|debug|info|warn|error|fatal]`

create a generic static resource

```
USAGE
  $ sfdx waw:static:create -n <string> -t <string> -d <directory> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -d, --outputdir=outputdir                       (required) folder for saving the created files
  -n, --name=name                                 (required) static resource name

  -t, --type=type                                 (required) static resource type (application/javascript,
                                                  text/javascript, application/xml, text/xml, text/css, text/plain,
                                                  etc.)

  --json                                          format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/static/create.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/static/create.ts)_

## `sfdx waw:trace:create [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

create trace flag

```
USAGE
  $ sfdx waw:trace:create [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/trace/create.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/trace/create.ts)_

## `sfdx waw:trace:delete [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

delete trace flag

```
USAGE
  $ sfdx waw:trace:delete [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/trace/delete.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/trace/delete.ts)_

## `sfdx waw:trace:list [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

list trace flags

```
USAGE
  $ sfdx waw:trace:list [-u <string>] [--apiversion <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal]

OPTIONS
  -u, --targetusername=targetusername             username or alias for the target org; overrides default target org
  --apiversion=apiversion                         override the api version used for api requests made by this command
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/trace/list.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/trace/list.ts)_

## `sfdx waw:workbench:open [-s <string> -t <string>] [-r <string>] [-u <string>] [--apiversion <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal]`

open workbench using the current target username

```
USAGE
  $ sfdx waw:workbench:open [-s <string> -t <string>] [-r <string>] [-u <string>] [--apiversion <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal]

OPTIONS
  -r, --urlonly=urlonly                                urlonly
  -s, --setdefaultworkbenchurl=setdefaultworkbenchurl  store the workbench url as default
  -t, --targetworkbenchurl=targetworkbenchurl          target workbench url

  -u, --targetusername=targetusername                  username or alias for the target org; overrides default target
                                                       org

  --apiversion=apiversion                              override the api version used for api requests made by this
                                                       command

  --json                                               format output as json

  --loglevel=(trace|debug|info|warn|error|fatal)       [default: warn] logging level for this command invocation
```

_See code: [src/commands/waw/workbench/open.ts](https://github.com/WadeWegner/sfdx-waw-plugin/blob/v1.0.0/src/commands/waw/workbench/open.ts)_
<!-- commandsstop -->
