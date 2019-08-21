
import { flags, SfdxCommand } from '@salesforce/command';
import { Global, Messages, SfdxError } from '@salesforce/core';
import { JsonMap } from '@salesforce/ts-types';
import * as fsx from 'fs-extra';
import * as open from 'open';
import { join } from 'path';
import * as url from 'url';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('workbench.open.description');
  public static examples = [];

  protected static flagsConfig = {
    targetworkbenchurl: flags.string({
      char: 't',
      description: messages.getMessage('workbench.open.flags.targetworkbenchurl')
    }),
    setdefaultworkbenchurl: flags.string({
      char: 's',
      description: messages.getMessage('workbench.open.flags.setdefaultworkbenchurl'),
      dependsOn: ['targetworkbenchurl']
    }),
    urlonly: flags.string({
      char: 'r',
      description: messages.getMessage('workbench.open.flags.urlonly')
    })
  };

  protected static requiresUsername = true;

  public async run(): Promise<JsonMap> {
    const urlOnly = this.flags.urlonly;
    const setDefaultworkbenchUrl = this.flags.setdefaultworkbenchurl;
    let targetWorkbenchUrl = this.flags.targetworkbenchurl;
    const globalWorkbenchFilePath = this.getDefaultWorkbenchFilePath();

    if (targetWorkbenchUrl) {
      const urlParseResult = url.parse(targetWorkbenchUrl);

      if (!urlParseResult.hostname) {
        throw new SfdxError('Invalid target workbench url. Please use a valid url.');
      }

      // store default workbench url if if possible
      if (setDefaultworkbenchUrl) {
        const workbench = {
          defaultWorkbenchUrl: targetWorkbenchUrl
        };
        await fsx.outputFile(globalWorkbenchFilePath, JSON.stringify(workbench, null, 2));
        this.ux.log(`Stored ${targetWorkbenchUrl} in ${globalWorkbenchFilePath}.\n`);
      }
    } else {
      // Check the default
      try {
        await fsx.stat(globalWorkbenchFilePath);
      } catch (err) {
        throw new SfdxError('A default Workbench URL was not found. Please specify with -t|--targetWorkbenchUrl.');
      }
      const workbenchPathJson = require(globalWorkbenchFilePath);
      targetWorkbenchUrl = workbenchPathJson.defaultWorkbenchUrl;
    }

    const org = this.org;
    const conn = org.getConnection();
    await org.refreshAuth();

    const accessToken = conn.accessToken;
    const instanceUrl = conn.instanceUrl;
    const apiVersion = conn.version;
    const serverUrl = `${instanceUrl}/services/Soap/u/${apiVersion}`;

    const workbenchUrlWithSid = url.resolve(targetWorkbenchUrl, `/login.php?serverUrl=${serverUrl}&sid=${accessToken}`);

    if (urlOnly) {
      this.ux.log(`Access workbench as user ${org.getUsername()} with the following URL: ${workbenchUrlWithSid}`);
    } else {
      this.ux.log(`Opening ${targetWorkbenchUrl} and logging into ${org.getUsername()}.`);
      open(workbenchUrlWithSid);
    }
    return { targetWorkbenchUrl, username: org.getUsername() };
  }

  private getDefaultWorkbenchFilePath() {
    const globalFolder = Global.DIR;
    const pluginPath = join(globalFolder, 'vendors', 'sfdx-waw-plugin');
    const fileName = 'workbench.json';
    return join(pluginPath, fileName);
  }
}
