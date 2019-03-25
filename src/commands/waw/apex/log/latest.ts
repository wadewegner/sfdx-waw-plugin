
import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson, ensureArray, ensureString, get } from '@salesforce/ts-types';
import { runCommand } from '../../../../lib/sfdx';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ApexLogGet extends SfdxCommand {
  public static description = messages.getMessage('apex.log.latest.description');
  public static examples = [];

  protected static requiresUsername = true;

  public async run(): Promise<AnyJson> {
    const apexLogLists = ensureArray((await runCommand(`sfdx force:apex:log:list -u ${this.org.getUsername()}`)).result);
    const logId = ensureString(get(apexLogLists[apexLogLists.length - 1], 'Id'));
    const apexLog = await runCommand(`sfdx force:apex:log:get -i ${logId} -u ${this.org.getUsername()}`);
    return { log: ensureString(apexLog.result) };

  }
}
