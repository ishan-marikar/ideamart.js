var utilities = require('../utilities');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('IdeaMart:SMS');

function SMS(options) {
  this.utilities = utilities({
    url: options.url,
    applicationID: options.applicationID,
    password: options.password
  });
  this.webhook = options.webhook || '/mo-receiver';
  this.iterator = null;
  EventEmitter.call(this);
}

util.inherits(SMS, EventEmitter);

SMS.prototype.sendTextMessage = function(options, callback) {
  debug('Sending SMS');
  this.utilities.createRequest({
      destinationAddresses: (typeof options.destination === 'object') ? JSON.stringify(options.destination) : options.destination,
      message: options.message,
      deliveryStatusRequest: (options.deliveryStatus === true ? 1 : 0).toString()
    },
    function(error, response) {
      return callback(error, response);
    });
};

SMS.prototype.messageHandler = function(request, response, next) {
  var that = this;
  // TODO: Implement recieve SMS functionality
  if (request.url === this.webhook) {
    var body = [];
    request.on('error', function(error) {
      callback(error);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      var data = JSON.parse(body);
      that.emit('message', data);
    });
  }
};


module.exports = SMS;
