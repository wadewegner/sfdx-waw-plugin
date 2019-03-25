import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson, ensureArray, get, getString } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('project.pdir.delete.description');
  public static examples = [];

  public static readonly flagsConfig = {
    path: flags.string({
      char: 'p',
      description: messages.getMessage('project.pdir.flags.path')
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const packageDirectoryPath = this.flags.path;
    const projectJson = await this.project.retrieveSfdxProjectJson();
    const contents = projectJson.getContents();
    const packageDirectories = ensureArray(contents.packageDirectories);

    const exists = !!packageDirectories.find(table => {
      const tablePath = getString(table, 'path');
      return tablePath === packageDirectoryPath;
    });

    if (!exists) {
      throw new SfdxError(`Unable to find ${packageDirectoryPath} in your package directories.`);
    }

    for (let i = 0; i < packageDirectories.length; i++) {
      if (get(packageDirectories[i], 'path') === packageDirectoryPath) {
        packageDirectories.splice(i, 1);
      }
    }

    await projectJson.write();
    this.ux.styledJSON(contents);
    return { contents };
  }
}
