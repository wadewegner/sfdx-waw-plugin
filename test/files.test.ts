const assert = require('chai').assert;
const files = require('../src/lib/files');
const manifest = require('../src/lib/manifest');
import * as path from 'path';

describe('files', function() {
  this.timeout(15000);

  let manifestJson;
  const rawUrlManifestFolder = 'https://raw.githubusercontent.com/wadewegner/Strike-Components/master';
  const rawUrlManifest = `${rawUrlManifestFolder}/sfdx-oss-manifest.json`;

  describe('writing files', () => {
    it('should get the manifest file correctly', (done) => {
      files.getManifest(rawUrlManifest, (body) => {

        assert.isNotNull(body);

        manifestJson = JSON.parse(body);
        const version = manifestJson.version;
        const sourceFiles = manifestJson.files;

        assert.isNotNull(manifestJson);
        assert.isNotNull(version);

        assert.isNotNull(sourceFiles);
        assert.isArray(sourceFiles);

        done();
      });
    });
  });

  describe('creating manifest', () => {
    it('manifest create should return a string pointing to the new manifest file', (done) => {
      manifest.createManifest(path, (manifestPath) => {
        assert.isNotNull(manifestPath);
        assert.equal(path.extname(manifestPath), '.json');
        done();
      });
    });
  });
});
