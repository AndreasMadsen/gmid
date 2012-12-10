
var os = require('os');
var crypto = require('crypto');

var prefix = '';

// Add hostname as a hex value
var shasum = crypto.createHash('md5');
    shasum.update(os.hostname());

prefix += shasum.digest('hex');

// Add pid as a hex value
var pidHex = process.pid.toString(16);
// A pid shouldn't be able to be more than 6 digest long
var pidMissing = 6 - pidHex.length;
if (pidMissing < 0) pidMissing = 0;

prefix += Array(pidMissing + 1).join('0') + pidHex;

// Add a random hex value
var random = crypto.randomBytes(4).toString('hex');

// counter increase for every run
var counter = 0;

module.exports = function gmid() {
  var counterHex = (counter++).toString(16);

  // Allow for a 6 digit hex string
  var counterMissing = 6 - counterHex.length;
  counterHex = Array(counterMissing + 1).join('0') + counterHex;

  // once counter has reached FFFFFF reset the
  // counter and create a new set of random bytes
  if (counter === 16777215) {
    counter = 0;
    random = crypto.randomBytes(4).toString('hex');
  }

  // return the random string
  return prefix + random + counterHex;
};
