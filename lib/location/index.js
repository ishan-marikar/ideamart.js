var utilities = require('../utilities');
var debug = require('debug')('IdeaMart:SMS');

function Location(options) {
  this.utilities = utilities({
    url: options.url,
    applicationID: options.applicationID,
    password: options.password
  });
}

Location.prototype.getLocation = function(options, callback) {
  this.utilities.createRequest({
      subscriberId: options.subscriber,
      serviceType: options.serviceType || "IMMEDIATE",
      responseTime: options.responseTime || "NO_DELAY",
      freshness: options.freshness || "HIGH",
      horizontalAccuracy: options.horizontalAccuracy || "1500",
      version: options.version || '2.0'
    },
    function(error, response) {
      return callback(error, response);
    });
};

module.exports = Location;
