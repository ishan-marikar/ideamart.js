var IdeaMart = require('../');
var http = require('http');

var Subscription = new IdeaMart.Subscription({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/subscription/'
});

// Send a text message to the customer
Subscription.subscribe({
  subscriber: 'tel:94777484484',
  subscriberStatus: true
}, function(error, status) {
  console.log(status);
});

Subscription.getSubscriberStatus( 'tel:94777484484', function(error, status){
  console.log(status);
});

// Is emitted when a text message is sent to the web application
Subscription.on('subscriber', function(message){
  console.log(message);
});

// Create an http server and run a webhook to recieve messages
http.createServer(function(request, response){
  Subscription.subscriptionHandler(request, response, function(error){
    response.statusCode = 404;
    response.end('Nope. You\'ve visited the wrong page, buddy.');
  });
}).listen(5556);
