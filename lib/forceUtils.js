const alm = require('salesforce-alm');

module.exports = {

  getConsumerSecret: () => {
      let generatedConsumerSecret = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      for (let i=0; i < 9; i++ ) {
          generatedConsumerSecret += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return generatedConsumerSecret;
  },

  getUsername: (targetUsername, result) => {
    alm.orgApi.list().then((data) => {
        data.forEach((orgData) => {
          if (orgData.username === targetUsername || orgData.alias === targetUsername) {
            const username = orgData.username;
            result(username);
          }
        });
    });
  }
};