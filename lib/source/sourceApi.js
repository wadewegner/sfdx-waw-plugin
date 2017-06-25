'use strict';

const _ = require('lodash');
const os = require('os');
const path = require('path');
const recursive = require('recursive-readdir');
const jsonfile = require('jsonfile');
const urlExists = require('url-exists');
const fs = require('fs');

const files = require(path.join(__dirname, '..', 'files.js'));
const messages = require(path.join(__dirname, '..', 'messages'))();

// Private helper functions
const _pushToGithub = (flags) => {

  const targetPath = flags.path;

  // if host is not specified then use github.com
  let server = flags.server;
  if (!server) {
    server = 'github.com';
  }

  const url = `https://${server}/${flags.repository}`;

  // ensure source folder exists
  if (!fs.existsSync(targetPath)) {
    console.log("Specified file path doesn't exists"); // eslint-disable-line no-console
    return;
  }

  // if branch not specified, default to master
  let branch = flags.branch;
  if (!branch) {
    branch = 'master';
  }

  // check to ensure Github repo exists
  urlExists(url, (err1, repoExists) => {
    if (!repoExists) {
      console.log('Github repository not found'); // eslint-disable-line no-console
      return;
    }

    const rawUrlManifestFolder = `https://raw.githubusercontent.com/${flags.repository}/${branch}`;
    const rawUrlManifest = `${rawUrlManifestFolder}/sfdx-oss-manifest.json`;
    const rawApiUrl = `https://api.github.com/repos/${flags.repository}/git/trees/${branch}?recursive=1`;


    // check to ensure sfdx-oss-manifest.json exists   
    urlExists(rawUrlManifest, (err2, manifestExists) => {
      if (!manifestExists) {
        console.log('sfdx-oss-manifest.json not found in repository'); // eslint-disable-line no-console
        return;
      }

      files.getManifest(rawUrlManifest, (body) => {

        const manifestJson = JSON.parse(body);
        const version = manifestJson.version;
        const sourceFolder = manifestJson.sourceFolder;

        // check version
        if (version === '1.0.0') {

          const sfdxSource = manifestJson.sfdxSource;

          // currently only support SFDX source
          if (!sfdxSource) {
            console.log('Currently only sfdx source is supported'); // eslint-disable-line no-console
            return;
          }

          const manifestFolders = manifestJson.folders;

          files.writeFolders(manifestFolders, targetPath, rawUrlManifestFolder, rawApiUrl, sourceFolder, (outputFiles) => {

            console.log('Writing files for folders ...'); // eslint-disable-line no-console

            for (let i = 0, len = outputFiles.length; i < len; i++) {
              console.log(`  ${outputFiles[i]}`); // eslint-disable-line no-console
            }

          });
          

          // grab the files
          const manifestFiles = manifestJson.files;

          files.writeFiles(manifestFiles, targetPath, rawUrlManifestFolder, (outputFiles) => {

            console.log('Writing files ...'); // eslint-disable-line no-console

            for (let i = 0, len = outputFiles.length; i < len; i++) {
              console.log(`  ${outputFiles[i]}`); // eslint-disable-line no-console
            }

          });

        } else {
          console.log('Only version 1.0.0 is currently supported'); // eslint-disable-line no-console
        }
      });
    });
  });
}


/**
 * Describe the utility of your plugin *
 */
class Source {
    /**
     * Public members of the Offense class
     * @yourParam {type} description
     * @returns {Promise}.
     */

    create(context) {
        const dir = context.flags.path;
        const filePathAndName = path.join('.', 'sfdx-oss-manifest.json');
        const json = {
            sfdxSource: true,
            version : '1.0.0',
            files: [
            ]
        };

        let promise = Promise.resolve(
            recursive(dir, (err, files) => {

            json.files.push(files);
            jsonfile.writeFileSync(filePathAndName, json, { spaces: 2 });
            console.log(`Created file ${filePathAndName}. Be sure to remove files you don't want to include.`); // eslint-disable-line no-console
        }));
        return promise;
    };

    getHumanErrorMessage(){ 
        return 'Your plugin ran into an error.'
    }
    getHumanSuccessMessage() {
        return 'Your plugin ran successfully!'
    };

    oss(context) {
        return _pushToGithub(context.flags);
    }

}

module.exports = Source;
