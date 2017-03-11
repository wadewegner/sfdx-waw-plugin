const assert = require('chai').assert;

(function () {
  'use strict';

  describe('Array', () => { 

    before((done) => {
      done();
    });

    describe('#indexOf()', () => {
      it('should return -1 when the value is not present', (done) => {
        assert.equal(-1, [1,2,3].indexOf(4));
        done();
      });
    });
  });

}());