/* global describe, it, __dirname */

let assert = require('assert');
let fs = require('fs');
let path = require('path');

let packageJSON = require('../../package.json');
let bowerJSON = require('../../bower.json');

let readMe = fs.readFileSync(path.resolve(__dirname, '../..//README.md'), 'UTF-8');

describe('release should be consistent', () => {
  it('with a matching bower and npm module', () => {
    assert.equal(packageJSON.version, bowerJSON.version);
  });


  it('with bower valid entry point', () => {
    assert.equal(bowerJSON.main, 'dist/web/pubnub.min.js');
  });

  it('with npm valid entry point', () => {
    assert.equal(packageJSON.main, './lib/node/index.js');
  });

  it('with updated readme', () => {
    assert(readMe.indexOf('https://cdn.pubnub.com/sdk/javascript/pubnub.' + packageJSON.version + '.js') > 1);
    assert(readMe.indexOf('https://cdn.pubnub.com/sdk/javascript/pubnub.' + packageJSON.version + '.min.js') > 1);
  });
});
