const async = require('async');
const fs = require('fs');
const fse = require('fs-extra');
const https = require('https');
const path = require('path');

module.exports = {

  // get the sfdx-oss-manifest.json file
  getManifest: (rawUrlManifest, result) => {

    https.get(rawUrlManifest, (manifestResponse) => {
      let body = '';

      manifestResponse.on('data', (chunk) => {
        body += chunk;
      });

      manifestResponse.on('end', () => { 
        result(body);
      });

    }).on('error', (err) => {
      console.log(`Error when trying to retrieve sfdx-oss-manifest.json file: ${err}`); // eslint-disable-line no-console
    });
  },

  // download the files and write the files to the filesystem
  writeFiles: (manifestFiles, targetPath, rawUrlManifestFolder, done) => {

    let key = 0;
    
    async.each(manifestFiles, (fileName, callback) => {

      if (key === 0) {
        // console.log('Writing files ...'); // eslint-disable-line no-console
      }

      const filePathAndName = path.join(targetPath, fileName);
      const filePath = path.dirname(filePathAndName);

      fse.ensureDirSync(filePath);

      const localFile = fs.createWriteStream(filePathAndName);
      const fileUrl = `${rawUrlManifestFolder}/${fileName}`;

      https.get(fileUrl, (fileResponse) => {
        fileResponse.pipe(localFile);
        // console.log(`  ${filePathAndName}`); // eslint-disable-line no-console
      });

      key++;

      callback();

    });

    done(manifestFiles);
  }
};