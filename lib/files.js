const async = require('async');
const fs = require('fs');
const fse = require('fs-extra');
const https = require('https');
const path = require('path');
const request = require('request');

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

    async.each(manifestFiles, (fileName, callback) => {

      const filePathAndName = path.join(targetPath, fileName);
      const filePath = path.dirname(filePathAndName);

      fse.ensureDirSync(filePath);

      const localFile = fs.createWriteStream(filePathAndName);
      const fileUrl = `${rawUrlManifestFolder}/${fileName}`;

      https.get(fileUrl, (fileResponse) => {
        fileResponse.pipe(localFile);
      });

      callback();

    });

    done(manifestFiles);
  },

  writeFolders: (manifestFolders, targetPath, rawUrlManifestFolder, rawApiUrl, sourceFolder, done) => {

    // console.log(`folder: ${rawUrlManifestFolder}`);
    // console.log(`api: ${rawApiUrl}`);

    const options = {
      url: rawApiUrl,
      headers: {
        'User-Agent': 'sfdx OSS agent'
      }
    };

    function callback(error, response, body) {

      const jsonBody = JSON.parse(body);

      async.each(jsonBody.tree, (fileName, callback2) => {

        let fileNamePath = fileName.path;
        const type = fileName.type;

        //console.log(fileName.path);

        if (type === 'blob') {
          if (fileNamePath.indexOf('/') >= 0) { //that means it has a / in it, so nothing from top level
            //console.log(fileNamePath + "=================");

            const relativeToSource = fileNamePath.replace(sourceFolder + '/', '');
            //console.log("relativeToSource (" + sourceFolder + "): " + relativeToSource);

            if (!sourceFolder || fileName.path.indexOf(sourceFolder)> -1){

              const fileNameSplit = relativeToSource.split('/');
              //console.log("matches source folder!");

              for (let i=0; i<manifestFolders.length; i++){ //check against each folder
                //console.log("checking folder" + manifestFolders[i]);
                if (relativeToSource.indexOf(manifestFolders[i])==0){

                  fileNamePath = fileNamePath.replace(sourceFolder, '');

                  const filePathAndName = path.join(targetPath, fileNamePath);
                  const filePath = path.dirname(filePathAndName);

                  console.log("file from manifest folder " + manifestFolders[i] + " : " + fileNamePath);

                  fse.ensureDirSync(filePath);

                  const localFile = fs.createWriteStream(filePathAndName);
                  const fileUrl = `${rawUrlManifestFolder}/${fileNamePath}`;

                  https.get(fileUrl, (fileResponse) => {
                    fileResponse.pipe(localFile);
                  });
                } //else {console.log("doesn't match this folder");}
              } //end of folder loop
            } //else {console.log("disqualified for not matching source folder");}
          } //else {console.log("disqualified for being top level");}
        } //else {console.log("disqualified because not blob");}

        callback2();
      });

      done(manifestFolders);
    }

    request(options, callback);
  }
};