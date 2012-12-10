
var os = require('os');
var crypto = require('crypto');

module.exports = function gmid() {
  var result = '';

  // Add hostname as a hex value
  var shasum = crypto.createHash('md5');
      shasum.update(os.hostname());

  result += shasum.digest('hex');

  // Add pid as a hex value
  var pidHex = process.pid.toString(16);
  // A pid shouldn't be able to be more than 6 digest long
  var pidMissing = 6 - pidHex.length;
  if (pidMissing < 0) pidMissing = 0;

  result += Array(pidMissing + 1).join('0') + pidHex;

  // Add a random hex value
  result += crypto.randomBytes(4).toString('hex');

  return result;
};
