var utilities = require('../utilities');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('IdeaMart:SMS');
var url = require('url-join');

function Subscription(options) {
  this.utilities = utilities({
    url: options.url,
    applicationID: options.applicationID,
    password: options.password
  });
  this.webhook = options.webhook || '/mo-receiver';
  EventEmitter.call(this);
}

util.inherits(Subscription, EventEmitter);

Subscription.prototype.subscribe = function(options, callback) {
  this.utilities.createRequest({
      url: url(this.utilities.options.url, 'send'),
      action: (options.subscriberStatus === true ? 1 : 0),
      subscriberId: options.subscriber
    },
    function(error, response) {
      return callback(error, response);
    });
};

Subscription.prototype.getSubscriberStatus = function(subscriber, callback) {
  this.utilities.createRequest({
      url: url(this.utilities.options.url, 'getStatus'),
      subscriberId: subscriber
    },
    function(error, response) {
      return callback(error, response);
    });
};

Subscription.prototype.getSubscriberBaseSize = function(subscriber, callback) {
  this.utilities.createRequest({
      url: url(this.utilities.options.url, 'query-base'),
    },
    function(error, response) {
      return callback(error, response);
    });
};


Subscription.prototype.subscriptionHandler = function(request, response, next) {
  var that = this;
  if (request.url === this.webhook) {
    var body = [];
    request.on('error', function(error) {
      callback(error);
    }).on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      var data = JSON.parse(body);
      that.emit('subscriber', data);
    });
  }
};


module.exports = Subscription;
