const urlExists = require('url-exists');
const fs = require('fs');
const files = require('../lib/files.js');

(function () {
  'use strict';

  module.exports = {
    topic: 'source',
    command: 'oss',
    description: 'Easily pulls in open source from a Github repository',
    help: 'help text for waw:source:oss',
    flags: [{
        name: 'repository',
        char: 'r',
        description: 'Git repository (e.g. "wadewegner/Strike-Components")',
        required: true,
        hasValue: true
      },
      {
        name: 'path',
        char: 'p',
        description: 'Path for downloaded source',
        required: true,
        hasValue: true
      },
      {
        name: 'branch',
        char: 'b',
        description: 'Git repository branch (default is "master")',
        required: false,
        hasValue: true
      },
      {
        name: 'tag',
        char: 't',
        description: 'Git repository tag',
        required: false,
        hasValue: true
      },
      {
        name: 'server',
        char: 's',
        description: 'Git host server url (default is "github.com")',
        required: false,
        hasValue: true
      }
    ],
    run(context) {

      const targetPath = context.flags.path;

      // if host is not specified then use github.com
      let server = context.flags.server;
      if (!server) {
        server = 'github.com';
      }

      const url = `https://${server}/${context.flags.repository}`;

      // ensure source folder exists
      if (!fs.existsSync(targetPath)) {
        console.log("Specifiec file path doesn't exists"); // eslint-disable-line no-console
        return;
      }

      // if branch not specified, default to master
      let branch = context.flags.branch;
      if (!branch) {
        branch = 'master';
      }

      let tag = context.flags.tag;
      if (!tag) {
        branch = tag;
      }

      // check to ensure Github repo exists
      urlExists(url, (err1, repoExists) => {
        if (!repoExists) {
          console.log('Github repository not found'); // eslint-disable-line no-console
          return;
        }

        const rawUrlManifestFolder = `https://raw.githubusercontent.com/${context.flags.repository}/${branch}`;
        const rawUrlManifest = `${rawUrlManifestFolder}/sfdx-oss-manifest.json`;
        const rawApiUrl = `https://api.github.com/repos/${context.flags.repository}/git/trees/${branch}?recursive=1`;


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
  };
}());
