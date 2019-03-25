import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson, ensureArray } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('project.display.description');
  public static examples = [];

  public static readonly flagsConfig = {
    packagedirectories: flags.boolean({
      char: 'p',
      description: messages.getMessage('project.display.flags.packagedirectories')
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const packageDirectories = this.flags.packageDirectories;
    const projectJson = await this.project.retrieveSfdxProjectJson();
    const contents = projectJson.getContents();

    if (packageDirectories) {
      this.ux.styledJSON(ensureArray(contents.packageDirectories));
    } else {
      this.ux.styledJSON(contents);
    }
    return contents;
  }
}
