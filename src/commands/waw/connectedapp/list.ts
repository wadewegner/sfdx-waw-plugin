
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { MetadataInfo } from 'jsforce';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('connectedapp.list.description');
  public static examples = [];

  public static readonly flagsConfig = {
    connectedappname: flags.string({
      char: 'n',
      description: 'connectedapp.list.flags.connectedappname',
      required: true
    })
  };

  protected static requiresUsername = true;

  public async run(): Promise<MetadataInfo> {
    const connectedappname = this.flags.connectedappname;

    const metadataResult = await this.org.getConnection().metadata.read('ConnectedApp', connectedappname) as MetadataInfo;
    this.ux.styledJSON(metadataResult);
    return metadataResult;
  }
}
