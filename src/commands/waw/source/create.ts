import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as jsonfile from 'jsonfile';
import { join } from 'path';
import * as recursive from 'recursive-readdir';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('source.create.description');
  public static examples = [];

  public static readonly flagsConfig = {
    path: flags.string({
      char: 'p',
      description: messages.getMessage('source.create.flags.path'),
      required: true
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const dir = this.flags.path;
    const filePathAndName = join('.', 'sfdx-oss-manifest.json');
    const json = {
      sfdxSource: true,
      version : '1.0.0',
      files: []
    };

    await new Promise((resolve, reject) => {
      recursive(dir, (err, files) => {
        if (err) { reject(err); }
        json.files.push(files);
        jsonfile.writeFileSync(filePathAndName, json, { spaces: 2 });
        resolve(files);
      });
    });
    this.ux.log(`Created file ${filePathAndName}. Be sure to remove files you don't want to include.`);
    return { filePathAndName, json };
  }
}
