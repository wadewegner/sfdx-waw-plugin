
import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { RecordResult } from 'jsforce';
import { getDebugLevel } from '../../../lib/sobject_helpers';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('trace.create.description');
  public static examples = [];

  protected static requiresUsername = true;

  public async run(): Promise<RecordResult> {
    const targetUsername = this.org.getUsername();
    const conn = this.org.getConnection();
    const debugLevelName = 'clicreated';

    const debugLevelId = await getDebugLevel(debugLevelName, conn);

    const res = await conn.tooling.query<{ Id: string }>(`SELECT Id FROM User WHERE Username = '${targetUsername}'`);
    const userNameId = res.records[0].Id;

    const traceFlag = await conn.tooling.sobject('TraceFlag').create({
      DebugLevelId: debugLevelId,
      TracedEntityId: userNameId,
      Workflow: 'INFO',
      Validation: 'INFO',
      Callout: 'INFO',
      ApexCode: 'DEBUG',
      ApexProfiling: 'INFO',
      Visualforce: 'INFO',
      System: 'DEBUG',
      Database: 'INFO',
      LogType: 'USER_DEBUG',
      Wave: 'INFO'
    });
    this.ux.styledJSON(traceFlag);
    return traceFlag;
  }
}
