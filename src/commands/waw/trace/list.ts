
import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { JsonMap } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('trace.list.description');
  public static examples = [];

  protected static requiresUsername = true;

  public async run(): Promise<JsonMap[]> {
    const conn = this.org.getConnection();
    const res = await conn.tooling.query<JsonMap>('SELECT Id, CreatedDate, TracedEntityId, ExpirationDate, Workflow, Validation, Callout, ApexCode, ApexProfiling, Visualforce, System, Database, DebugLevelId, LogType, Wave FROM TraceFlag');
    this.ux.styledJSON(res.records);
    return res.records;
  }
}
