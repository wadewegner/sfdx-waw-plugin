const assert = require('chai').assert;
const files = require('../lib/files.js');
const shell = require('shelljs');

(function () {
  'use strict';

  describe('files', function() { 

    this.timeout(15000);

    let manifestJson;
        const rawUrlManifestFolder = 'https://raw.githubusercontent.com/wadewegner/Strike-Components/master';
        const rawUrlManifest = `${rawUrlManifestFolder}/sfdx-oss-manifest.json`;

    before(function() {

    });

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

      it('should correctly write files to the filesystem', (done) => {

        const manifestFiles = manifestJson.files;
        const targetPath = 'src';

        files.writeFiles(manifestFiles, targetPath, rawUrlManifestFolder, () => {
          
          const count = shell.exec('find ./src -type f | wc -l', {silent:true}).stdout;
          assert.equal(count, 100);

          done();

        });
      });
    });

    after(function() {
      
    });
  });
}());