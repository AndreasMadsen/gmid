
var test = require('tap').test;
var gmid = require('./gmid.js');

var generated = [];

test('localhost is me', function(t) {
  var value = null;

  for (var i = 0; i < 1000; i++) {
    value = gmid();
    t.equal(generated.indexOf(value), -1);
    t.equal(value.length, 52);
    generated.push(value);
  }

  t.end();
});
