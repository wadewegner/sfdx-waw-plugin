module.exports = {

  getDebugLevel: (developerName, conn, result) => {

    conn.tooling.query(`SELECT Id, DeveloperName FROM DebugLevel WHERE DeveloperName = '${developerName}'`, (err, res) => {

      let debugLevelId;
      if (res.totalSize === 0) {

        conn.tooling.sobject('DebugLevel').create({
          DeveloperName: developerName,
          Language: 'en_US',
          MasterLabel: 'Debug',
          Workflow: 'INFO',
          Validation: 'INFO',
          Callout: 'INFO',
          ApexCode: 'DEBUG',
          ApexProfiling: 'INFO',
          Visualforce: 'INFO',
          System: 'DEBUG',
          Database: 'INFO'
        }, (debugLevelErr, debugLevel) => {

          debugLevelId = debugLevel.id;
          result(debugLevelId);

        });
      } else {
        debugLevelId = res.records[0].Id;
        result(debugLevelId);
      }
    });
  }
};