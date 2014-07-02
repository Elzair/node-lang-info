var assert = require('assert')
  , nl     = require(__dirname + '/../../')
  ;

describe('node-lang-info', function() {
  before(function() {
    process.env.LANG = 'en_US.UTF-8';
  });

  it('should return the correct language for the given system', function() {
    assert.equal(nl(), 'en_US.UTF-8');
  });
});
