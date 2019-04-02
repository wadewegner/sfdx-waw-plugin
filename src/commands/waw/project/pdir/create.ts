
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { set } from '@salesforce/kit';
import { AnyJson, ensureArray, getString, has } from '@salesforce/ts-types';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('project.pdir.create.description');
  public static examples = [];

  public static readonly flagsConfig = {
    path: flags.string({
      char: 'p',
      description: messages.getMessage('project.pdir.flags.path')
    }),
    default: flags.boolean({
      char: 'd',
      description: messages.getMessage('project.pdir.create.flags.default')
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const packageDirectoryPath = this.flags.path;
    const setDefault = this.flags.default;
    const projectJson = await this.project.retrieveSfdxProjectJson();
    const contents = projectJson.getContents();
    const packageDirectories = ensureArray(contents.packageDirectories);

    const exists = !!packageDirectories.find(table => {
      const tablePath = getString(table, 'path');
      return tablePath === packageDirectoryPath;
    });

    if (exists) {
      throw new SfdxError(`Package directory ${packageDirectoryPath} already exists in your project definition.`);
    }

    const newPackageDir = {
      path: packageDirectoryPath
    };

    if (setDefault) {
      // get rid if the old one
      packageDirectories.forEach(packageDir => {
        if (has(packageDir, 'default')) {
          delete packageDir.default;
        }
      });
      set(newPackageDir, 'default', true);
    }

    packageDirectories.push(newPackageDir);
    await projectJson.write();
    this.ux.styledJSON(contents);
    return { contents };
  }
}
