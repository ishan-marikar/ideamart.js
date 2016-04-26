# ideamart.js

A simple node.js wrapper for the IdeaMart IDEA-PRO APIs

![alt text][logo]

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install ideamart.js --save
```

## Usage
```js
var IdeaMart = require('ideamart.js');

// Replace SMS with relevant function
var SMS = new IdeaMart.SMS({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/sms/send'
});
```

## APIs

### SMS

```js
var IdeaMart = require('ideamart.js');

// Replace SMS with relevant function
var SMS = new IdeaMart.SMS({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/sms/send',
  webhook: '/mo-receiver' // Optional, defaults to '/mo-receiver'
});

SMS.sendTextMessage({
  destination: "tel:94777484484",
  message: 'Ladidadida.',
  deliveryStatus: false // Optional, defaults to false
}, function(error, status) {
  console.log(status);
});

// Is emitted when a text message is sent to the web application
SMS.on('message', function(message){
  console.log(message);
});

// Create an http server and run a webhook to recieve messages
http.createServer(function(request, response){
  SMS.messageHandler(request, response, function(error){
    response.statusCode = 404;
    response.end('Nope. You\'ve visited the wrong page, buddy.');
  });
}).listen(5556);


```

### Location

```js
var IdeaMart = require('ideamart.js');

var Location = new IdeaMart.Location({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/lbs/locate'
});

Location.getLocation({
  destination: "tel:94777484484"
}, function(error, status) {
  console.log(status);
});

```

### Subscription
```js
var Subscription = new IdeaMart.Subscription({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/subscription/',
  webhook: '/subscribe'
});

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
```

## TODO
- [ ] Implement proper error handling, based on the responses of the API.
- [x] Implement SMS API
- [x] Implement LBS API
- [ ] Implement USSD API
- [ ] Implement CaaS API
- [x] Implement Subscription API
- [ ] Implement IVR API



## Tests

```sh
No unit tests yet.
```

## Dependencies

- [debug](https://github.com/visionmedia/debug): small debugging utility
- [unirest](https://github.com/Mashape/unirest-nodejs): Simplified, lightweight HTTP client library

## Dev Dependencies
None

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## License

ISC

[logo]: https://www.dialog.lk/dialogdocroot/content/images/content-images/dialog-partners/ideamart.jpg "IdeaMart"
