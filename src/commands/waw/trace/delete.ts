
import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { ErrorResult, RecordResult, SuccessResult } from 'jsforce';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('trace.delete.description');
  public static examples = [];

  protected static requiresUsername = true;

  public async run(): Promise<SuccessResult | ErrorResult | RecordResult[]> {
    const conn = this.org.getConnection();
    const debugLevelName = 'clicreated';

    const res = await conn.tooling.query<{ Id: string }>(`SELECT Id, DeveloperName FROM DebugLevel WHERE DeveloperName = '${debugLevelName}'`);
    const debugLevelId = res.records[0].Id;

    const deleteResult = await conn.tooling.destroy('DebugLevel', debugLevelId);
    this.ux.styledJSON(deleteResult);
    return deleteResult;
  }
}
