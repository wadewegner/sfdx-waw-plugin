
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fsx from 'fs-extra';
import { dirname, join } from 'path';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('static.create.description');
  public static examples = [];

  public static readonly flagsConfig = {
    name: flags.string({
      char: 'n',
      description: messages.getMessage('static.create.flags.name'),
      required: true
    }),
    type: flags.string({
      char: 't',
      description: messages.getMessage('static.create.flags.type'),
      required: true
    }),
    outputdir: flags.directory({
      char: 'd',
      description: messages.getMessage('static.create.flags.outputdir'),
      required: true
    })
  };

  public async run(): Promise<AnyJson> {
    const name = this.flags.name;
    const staticType = this.flags.type;
    const outputdir = this.flags.outputdir;

    const staticText = `<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Private</cacheControl>
    <contentType>${staticType}</contentType>
</StaticResource>`;

    const resourceMetaFile = join(outputdir, `${name}.resource-meta.xml`);
    const resourceFile = join(outputdir, `${name}.resource`);
    const filePath = dirname(resourceMetaFile);

    fsx.ensureDirSync(filePath);
    await fsx.writeFile(resourceMetaFile, staticText);
    this.ux.log(`Your resource files were created:\n\n${resourceFile}\n${resourceMetaFile}`);
    return { filePath, resourceMetaFile, staticText };
  }
}
