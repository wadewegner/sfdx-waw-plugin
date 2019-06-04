import * as async from 'async';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as https from 'https';
import * as path from 'path';
import * as request from 'request';

// get the sfdx-oss-manifest.json file
export function getManifest(rawUrlManifest, result) {
  https.get(rawUrlManifest, manifestResponse => {
    let body = '';

    manifestResponse.on('data', chunk => {
      body += chunk;
    });

    manifestResponse.on('end', () => {
      result(body);
    });

  }).on('error', err => {
    console.log(`Error when trying to retrieve sfdx-oss-manifest.json file: ${err}`); // eslint-disable-line no-console
  });
}

// download the files and write the files to the filesystem
export function writeFiles(manifestFiles, targetPath, rawUrlManifestFolder, done) {

  async.each(manifestFiles, (fileName, callback) => {

    const filePathAndName = path.join(targetPath, fileName);
    const filePath = path.dirname(filePathAndName);

    fse.ensureDirSync(filePath);

    const localFile = fs.createWriteStream(filePathAndName);
    const fileUrl = `${rawUrlManifestFolder}/${fileName}`;

    https.get(fileUrl, fileResponse => {
      fileResponse.pipe(localFile);
    });

    callback();

  });

  done(manifestFiles);
}

export function writeFolders(manifestFolders, targetPath, rawUrlManifestFolder, rawApiUrl, sourceFolder, done) {
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
      const fileType = fileName.type;

      if (fileType === 'blob') {
        // that means it has a / in it, so nothing from top level
        if (fileNamePath.indexOf('/') >= 0) {

          const relativeToSource = fileNamePath.replace(sourceFolder + '/', '');

          if (!sourceFolder || fileName.path.indexOf(sourceFolder) > -1) {
            for (const folder of manifestFolders) {
              if (relativeToSource.indexOf(folder) === 0) {

                fileNamePath = fileNamePath.replace(sourceFolder, '');

                const filePathAndName = path.join(targetPath, fileNamePath);
                const filePath = path.dirname(filePathAndName);

                console.log(`file from manifest folder ${folder} : ${fileNamePath}`);

                fse.ensureDirSync(filePath);

                const localFile = fs.createWriteStream(filePathAndName);
                const fileUrl = `${rawUrlManifestFolder}/${fileNamePath}`;

                https.get(fileUrl, fileResponse => {
                  fileResponse.pipe(localFile);
                });
              }
            }
          }
        }
      }

      callback2();
    });

    done(manifestFolders);
  }

  request(options, callback);
}
