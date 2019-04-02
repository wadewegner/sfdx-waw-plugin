
module.exports = {
  // get the sfdx-oss-manifest.json file
  createManifest: (path, result) => {
    const manifestPath = 'result.json';
    result(manifestPath);
  }
};
