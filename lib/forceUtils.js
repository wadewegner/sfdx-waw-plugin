const path = require('path');
const sfalm = require('salesforce-alm');
const almPath = path.dirname(require.resolve('salesforce-alm'));
const Org = require(path.join(almPath, 'lib', 'scratchOrgApi'));

module.exports = {

  getConsumerSecret: () => {
      let generatedConsumerSecret = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i=0; i < 9; i++ ) {
          generatedConsumerSecret += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return generatedConsumerSecret;
  },

  getOrg: (targetUsername, result) => {
    return Org.create(targetUsername).then(result);
  }
};