import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import * as fs from 'fs';
import * as urlExists from 'url-exists';

import * as files from '../../../lib/files';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('sfdx-waw-plugin', 'waw');

export default class ConnectedAppCreate extends SfdxCommand {
  public static description = messages.getMessage('source.oss.description');
  public static examples = [];

  public static readonly flagsConfig = {
    repository: flags.string({
      char: 'r',
      description: messages.getMessage('source.oss.flags.repository'),
      required: true
    }),
    path: flags.string({
      char: 'p',
      description: messages.getMessage('source.oss.flags.path'),
      required: true
    }),
    branch: flags.string({
      char: 'b',
      description: messages.getMessage('source.oss.flags.branch'),
      default: 'master'
      // exclusive: ['tag']
    }),
    tag: flags.string({
      char: 't',
      description: messages.getMessage('source.oss.flags.tag')
      // exclusive: ['branch']
    }),
    server: flags.string({
      char: 's',
      description: messages.getMessage('source.oss.flags.server'),
      default: 'github.com'
    })
  };

  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const targetPath = this.flags.path;
    const server = this.flags.server;

    const url = `https://${server}/${this.flags.repository}`;

    // ensure source folder exists
    if (!fs.existsSync(targetPath)) {
      throw new SfdxError(`Specifiec file path ${targetPath} doesn't exists`);
    }

    const branch = this.flags.branch || this.flags.tag;

    // check to ensure Github repo exists
    if (!(await this.checkUrl(url))) {
      throw new SfdxError('Github repository not found');
    }

    const rawUrlManifestFolder = `https://raw.githubusercontent.com/${this.flags.repository}/${branch}`;
    const rawUrlManifest = `${rawUrlManifestFolder}/sfdx-oss-manifest.json`;
    const rawApiUrl = `https://api.github.com/repos/${this.flags.repository}/git/trees/${branch}?recursive=1`;

    // check to ensure sfdx-oss-manifest.json exists
    if (!(await this.checkUrl(rawUrlManifest))) {
      throw new SfdxError('sfdx-oss-manifest.json not found in repository');
    }

    await this.writeFiles(rawUrlManifest, targetPath, rawUrlManifestFolder, rawApiUrl);
    return { rawUrlManifest, targetPath, rawUrlManifestFolder, rawApiUrl };
  }

  private checkUrl(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      urlExists(url, (err: Error, exists: boolean) => {
        if (err) {
          reject(err);
        } else {
          resolve(exists);
        }
      });
    });
  }

  private writeFiles(rawUrlManifest, targetPath, rawUrlManifestFolder, rawApiUrl) {
    return new Promise((resolve, reject) => {
      files.getManifest(rawUrlManifest, body => {
        const manifestJson = JSON.parse(body);
        const version = manifestJson.version;
        const sourceFolder = manifestJson.sourceFolder;

        // check version
        if (version === '1.0.0') {

          const sfdxSource = manifestJson.sfdxSource;

          // currently only support SFDX source
          if (!sfdxSource) {
            throw new SfdxError('Currently only sfdx source is supported');
          }

          const manifestFolders = manifestJson.folders;

          files.writeFolders(manifestFolders, targetPath, rawUrlManifestFolder, rawApiUrl, sourceFolder, outputFiles => {

            this.ux.log('Writing files for folders ...');

            for (let i = 0, len = outputFiles.length; i < len; i++) {
              this.ux.log(`  ${outputFiles[i]}`);
            }
          });

          // grab the files
          const manifestFiles = manifestJson.files;

          if (manifestFiles.length > 0) {
            files.writeFiles(manifestFiles, targetPath, rawUrlManifestFolder, outputFiles => {

              this.ux.log('Writing files ...');

              for (let i = 0, len = outputFiles.length; i < len; i++) {
                this.ux.log(`  ${outputFiles[i]}`);
              }

              resolve();
            });
          }

        } else {
          reject(new SfdxError('Only version 1.0.0 is currently supported'));
        }
      });
    });
  }
}
