
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { get } from 'request-promise';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ApexLogGet extends SfdxCommand {
  public static description = messages.getMessage('codeclean.results.description');
  public static examples = [];

  public static readonly flagsConfig = {
    id: flags.string({
      char: 'i',
      description: messages.getMessage('codeclean.flags.id'),
      required: true
    })
  };

  public async run(): Promise<AnyJson> {
    const jobId = this.flags.id;
    const checkApi = `https://sfcodeclean.herokuapp.com/api/job/${jobId}`;

    const options = {
      uri: checkApi,
      method: 'GET'
    };

    const body = await get(options);
    this.ux.log(body);
    return { body };
  }
}
