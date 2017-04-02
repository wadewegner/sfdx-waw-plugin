

module.exports = {

  getConsumerSecret: () => {
      let generatedConsumerSecret = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

      for (let i=0; i < 9; i++ ) {
          generatedConsumerSecret += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return generatedConsumerSecret;
  }
};