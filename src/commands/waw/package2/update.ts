import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { set } from '@salesforce/kit';
import { AnyJson, ensureArray, getString, JsonMap } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('package2.update.description');
  public static examples = [];

  public static readonly flagsConfig = {
    packagedirectory: flags.string({
      char: 'd',
      description: messages.getMessage('package2.update.flags.packagedirectory'),
      required: true
    }),
    id: flags.id({
      char: 'i',
      description: messages.getMessage('package2.update.flags.id')
    }),
    versionnumber: flags.string({
      char: 'n',
      description: messages.getMessage('package2.update.flags.versionnumber')
    }),
    versionname: flags.string({
      char: 'v',
      description: messages.getMessage('package2.update.flags.versionname')
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const packageDirectoryPath = this.flags.packagedirectory;
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

    const packageId = this.flags.id;
    const versionNumber = this.flags.versionnumber;
    const versionName = this.flags.versionname;
    let updated = false;

    for (const packageDirectory of packageDirectories as JsonMap[]) {
      if (getString(packageDirectories, 'path') === packageDirectoryPath) {
        if (packageId) {
          updated = true;
          set(packageDirectory, 'id', packageId);
        }
        if (versionNumber) {
          updated = true;
          set(packageDirectory, 'versionNumber', versionNumber);
        }
        if (versionName) {
          updated = true;
          set(packageDirectory, 'versionName', versionName);
        }
      }
    }

    if (updated) {
      await projectJson.write();
      this.ux.log('Updated sfdx-project.json');
    } else {
      this.ux.log('Nothing to update.');
    }
    return { updated, contents };
  }
}
