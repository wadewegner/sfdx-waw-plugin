import { SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { post } from 'request-promise';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ApexLogGet extends SfdxCommand {
  public static description = messages.getMessage('codeclean.check.description');
  public static examples = [];

  protected static requiresUsername = true;

  public async run(): Promise<AnyJson> {

    // Make sure we have a valid access token
    await this.org.refreshAuth();

    const startApi = 'https://sfcodeclean.herokuapp.com/api/job/';

    const data = {
      accessToken: this.org.getConnection().accessToken,
      instanceUrl: this.org.getConnection().instanceUrl
    };
    this.logger.debug('using connection information: ', data);

    const options = {
      uri: startApi,
      method: 'POST',
      json: data
    };

    // Is this the body or request?
    const body = await post(options);
    this.ux.styledJSON(body);

    return { body };
  }
}
