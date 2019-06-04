export const getDebugLevel = async (developerName, conn) => {

  const res = await conn.tooling.query(`SELECT Id, DeveloperName FROM DebugLevel WHERE DeveloperName = '${developerName}'`);

  let debugLevelId;

  if (res.totalSize === 0) {
    const debugLevel = await conn.tooling.sobject('DebugLevel').create({
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
    });

    debugLevelId = debugLevel.id;
    return debugLevelId;
  } else {
    debugLevelId = res.records[0].Id;
    return debugLevelId;
  }
};
