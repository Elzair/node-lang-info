var assert = require('assert')
  , nl     = require(__dirname + '/../../')
  , os     = require('os')
  ;

describe('node-lang-info', function() {
  if (os.platform() === 'win32') {
    describe('windows', function() {
      it('should return the System Language', function(done) {
        nl(function(err, lang) {
          assert.strictEqual(err, null);
          assert.ok(lang);
          done();
        });
      });
    });
  }
  else {
    describe('*nix', function() {
      it('should return an error because no language variable is set', function(done) {
        process.env.LANG = '';
        nl(function(err, lang) {
          assert.strictEqual(err, 'No language specified!');
          assert.equal(lang, null);
          done();
        });
      });

      it('should return the correct language for the given system', function(done) {
        process.env.LANG = 'en_US.UTF-8';
        nl(function(err, lang) {
          assert.strictEqual(err, null);
          assert.strictEqual(lang, 'en_US');
          done();
        });
      });
    });
  }
});
