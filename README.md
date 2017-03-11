# magento-sdk-19
Magento 1.9 Admin and Customer API

# Example Magento
[Manual](MANUAL.md)
IMPORTENT NOTE: The Magento API Exposes Attributes only by ID and Label as also Values it don't lists where this come from (example skus of assigned SimpleProducts) as also this SimpleProducts that are assigned often arn't indipendent buy able so we Ignore them
Every Product that we get is a Offered Product from the Shop as we use the CustomerAPI we see what the Customer does See.


```
var apiMagento19 = require('./');

var Magento19Connection = new apiMagento19({
    type: 'magento',
    version: '1.9',
    connection: {
      host: 'your.host',
      port: 443,
      path: '/api/xmlrpc/',
      login: 'your_username',
      pass: 'your_pass'
    }
});

// Magento19Connection === CompletApi Model

Magento19Connection.orders.get(options)
Magento19Connection.order.get(order)
Magento19Connection.order.set(order)

Magento19Connection.products.get(options)
Magento19Connection.product.get(order)

necMagento.login(function(err, sessId) {
  if (err) {
    // deal with error
    return;
  }
  // use magento

});

//Magento19Connection.orders.get
Magento19Connection.products = {
  get: function() {
    // Find SelectAbleOptions
    // Find Label and ID
    // Find Values for it and Labels for them

  }
}







```
