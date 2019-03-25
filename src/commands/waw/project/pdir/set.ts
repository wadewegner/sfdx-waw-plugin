import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { set } from '@salesforce/kit';
import { AnyJson, ensureArray, getBoolean, getString, has, JsonMap } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('project.pdir.set.description');
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
    const packageDirectories = ensureArray(contents.packageDirectories) as JsonMap[];

    const exists = packageDirectories.find(table => {
      const tablePath = getString(table, 'path');
      return tablePath === packageDirectoryPath;
    });

    if (!exists) {
      throw new SfdxError(`Unable to find ${packageDirectoryPath} in your package directories.`);
    }

    if (getBoolean(exists, 'default')) {
      throw new SfdxError('This package directory is already set as the default.');
    }

    // get rid if the old default
    packageDirectories.forEach(packageDir => {
      if (has(packageDir, 'default')) {
        delete packageDir.default;
      }
    });
    set(exists, 'default', true);

    await projectJson.write();
    this.ux.styledJSON(contents);
    return { contents };
  }
}
