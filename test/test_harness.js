var expect = require('expect.js'),
    Browser = require('zombie');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      expect([1,2,3].indexOf(5)).to.equal(-1);
    });
  });
});

describe("Google", function() {
  describe('main page', function() {
    it("should have title 'Google'", function(done) {
      var browser = new Browser();
      browser.visit('http://google.com/', function() {
        expect(browser.text("title")).to.equal('Google');
        done();
      });
    });
  });
});
