var unirest = require('unirest');
var debug = require('debug')('IdeaMart:Utilities');

function IdeaMartUtilities(options) {
  this.options = options;
}

IdeaMartUtilities.prototype.createRequest = function(object, callback) {
  object.applicationId = this.options.applicationID;
  object.password = this.options.password;
  var url = object.url || this.options.url;
  if(object.url) delete object.url;
  debug('Creating request to: ' + url);
  debug(JSON.stringify(object));
  unirest.post(url)
    .type('json')
    .send(object)
    .end(function(response) {
      debug('Response: ' + JSON.stringify(response.body));
      // TODO: Based on response.statusCode, emit an error message
      if(response.error) return callback(response.error);
      return callback(null, response.body);
    });
};


module.exports = function(options) {
  return new IdeaMartUtilities(options);
}
