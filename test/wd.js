require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
var wd = require('wd');

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browser = wd.promiseChainRemote('http://127.0.0.1:4444/wd/hub');

// optional extra logging
//browser._debugPromise();
browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

/* jshint evil: true */
browser
  .status()
  .init({browserName: process.argv[2] || 'chrome' })
  .get("http://admc.io/wd/test-pages/guinea-pig.html")
  .title()
    .should.become('WD Tests')
  .elementById('i am a link')
  .click()
  .eval("window.location.href")
    .should.eventually.include('guinea-pig2')
  .back()
  .elementByCss('#comments').type('Bonjour!')
  .getValue().should.become('Bonjour!fsefsef')
  .fin(function() { return browser.quit(); })
  .catch(function(err) {
    console.log(err);
    console.log(err.data);
  })
  .done();