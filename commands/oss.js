'use strict'

var request = require('request');
var urlExists = require('url-exists');
var https = require('https');
var fs = require('fs');
var path = require('path');
var fse = require('fs-extra');
var async = require('async');

module.exports = {
    topic: 'source',
    command: 'oss',
    description: 'Easily pulls in open source from a Github repository',
    help: 'help text for force:source:oss',
    flags: [
        { name: 'repository', char: 'r', description: 'Github repository (e.g. "wadewegner/Strike-Components")', required: true, hasValue: true },
        { name: 'path', char: 'p', description: 'Path for downloaded source', required: true, hasValue: true },
        { name: 'branch', char: 'b', description: 'Github repository branch (default is "master"', required: false, hasValue: true }
    ],
    run: function (context) {

        var targetPath = context.flags.path;

        if (!fs.existsSync(targetPath)) {
            console.log("Specifiec file path doesn't exists");
            return;
        }

        var url = 'https://github.com/' + context.flags.repository;

        // if branch not specified, default to master
        var branch = context.flags.branch;
        if (!branch) {
            branch = "master";
        }

        // check to ensure Github repo exists
        urlExists(url, function(err, exists) {
            if (!exists) {
                console.log("Github repository not found");
                return;
            }

            var rawUrlManifestFolder = 'https://raw.githubusercontent.com/' + context.flags.repository + '/' + branch;
            var rawUrlManifest = rawUrlManifestFolder + '/sfdx-oss-manifest.json';
            // check to ensure sfdx-oss-manifest.json exists   
            urlExists(rawUrlManifest, function(err, exists) {
                if (!exists) {
                    console.log("sfdx-oss-manifest.json not found in repository");
                    return;
                }

                // get the sfdx-oss-manifest.json file
                https.get(rawUrlManifest, function(res){
                    var body = '';

                    res.on('data', function(chunk){
                        body += chunk;
                    });

                    res.on('end', function(){
                        var manifest = JSON.parse(body);
                        var version = manifest.version;

                        // check version
                        if (version == "1.0.0") {

                            var sfdxSource = manifest.sfdxSource;

                            // currently only support SFDX source
                            if (!sfdxSource) {
                                console.log("Currently only sfdx source is supported");
                                return;
                            }
                            
                            var folders = manifest.folders;
                            var files = manifest.files;

                            // TODO: not yet supported
                            for(var folder in folders){
                                // var value = folders[folder];
                                // console.log(value);
                            }

                            var i = 0;

                            async.each(files, function(fileName, complete){

                                if (i == 0) {
                                    console.log("writing files ...");
                                }
                                var filePathAndName = path.join(targetPath, fileName);
                                var filePath = path.dirname(filePathAndName);

                                fse.ensureDirSync(filePath);

                                var localFile = fs.createWriteStream(filePathAndName);
                                var fileUrl = rawUrlManifestFolder + '/' + fileName;

                                console.log(fileUrl);

                                var request = https.get(fileUrl, function(response) {
                                    response.pipe(localFile);
                                    // console.log("  " + filePathAndName);
                                });

                                i++;

                                complete();

                            }, function(err){
                                // console.log("An error occurred while writing the files: " + err);
                            });

                        } else {
                            console.log("Only version 1.0.0 is currently supported");
                            return;
                        }

                    });
                }).on('error', function(e){
                    console.log("Error when trying to retrieve sfdx-oss-manifest.json file");
                });



            });
        });
    }
}
