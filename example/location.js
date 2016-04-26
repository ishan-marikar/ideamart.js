var IdeaMart = require('../');

var Location = new IdeaMart.Location({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/lbs/locate'
});

Location.getLocation({
  destination: "tel:94777484484"
}, function(error, status) {
  console.log('Error: ', error);
  console.log('Status: ', status);
});
