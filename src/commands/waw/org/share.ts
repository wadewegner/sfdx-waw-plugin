
import { flags, SfdxCommand } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson, ensureString } from '@salesforce/ts-types';
import { runCommand } from '../../../lib/sfdx';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('org.share.description');
  public static examples = [];

  public static readonly flagsConfig = {
    emailaddress: flags.email({
      char: 'e',
      description: messages.getMessage('org.share.flags.emailaddress'),
      required: true
    })
  };

  protected static requiresUsername = true;

  public async run(): Promise<AnyJson> {
    const emailAddress = this.flags.emailaddress;
    const username = this.org.getUsername();
    const devHub = await this.org.getDevHubOrg();
    const devHubUsername = devHub.getUsername();

    const frontDoorUrlForOrg = ensureString((await runCommand(`sfdx force:org:open --urlonly -u ${username}`)).url);

    const options = {
      method: 'post',
      body: JSON.stringify({
        inputs: [{
          emailBody: `${devHubUsername} has created you a Salesforce org. Here's your login URL: ${frontDoorUrlForOrg}. Keep this URL confidential and do not share with others.`,
          emailAddresses: emailAddress,
          emailSubject: `${devHubUsername} created you a new Salesforce org`,
          senderType: 'CurrentUser'
        }]
      }),
      url: '/services/data/v36.0/actions/standard/emailSimple'
    };

    await devHub.getConnection().request(options);
    this.ux.log(`Successfully shared ${username} with ${emailAddress}.`);
    return { username, devHubUsername, emailAddress, frontDoorUrlForOrg };
  }
}
