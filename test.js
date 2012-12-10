
var test = require('tap').test;
var gmid = require('./gmid.js');

test('localhost is me', function(t) {
  for (var i = 0; i < 10; i++) {
    t.equal(gmid().length, 46);
  }

  t.end();
});
