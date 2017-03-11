# Magento 1.9 XMLRPC Manual

## Usage

```js
var MagentoAPI = require('./magento');
var magento = new MagentoAPI({
  host: 'your.host',
  port: 443,
  path: '/api/xmlrpc/',
  login: 'your_username',
  pass: 'your_pass'
});

/*
var myCon = new getT({
      consumer: {
        key: '49831ee0f671106fc08da4aaea42dcd0',
        secret: '5a9277172226a8bb9b5bb7df29f3ee37'
      },
      token: null, // If you already got a token,
      secret: null, // The secret for the supplyed token
      url: 'http://172.17.0.6/oauth/initiate',
      storeId: 1
  });
*/

var myCon = {
  {
    host: 'your.host',
    port: 443,
    path: '/api/xmlrpc/',
    login: 'your_username',
    pass: 'your_pass'
  };


var necMagento = new nec({
    type: 'magento',
    version: '1.9',
    connection: myCon
});


magento.login(function(err, sessId) {
  if (err) {
    // deal with error
    return;
  }

  // use magento
});
```

If need be, you can manually change the session id.

```js
magento.changeSession(newSessionId);
```

All of the API methods take an object of params as the first argument, and a callback as the second.

Or, if no params are sent, just a callback as the first argument.

## Methods

+ [Catalog Category](./readmes/catalog_category.md)
+ [Catalog Category Attribute](./readmes/catalog_category_attribute.md)
+ [Catalog Product](./readmes/catalog_product.md)
+ [Catalog Product Attribute](./readmes/catalog_product_attribute.md)
+ [Catalog Product Attribute Media](./readmes/catalog_product_attribute_media.md)
+ [Catalog Product Attribute Set](./readmes/catalog_product_attribute_set.md)
+ [Catalog Product Custom Option](./readmes/catalog_product_custom_option.md)
+ [Catalog Product Custom Option Value](./readmes/catalog_product_custom_option_value.md)
+ [Catalog Product Downloadable Link](./readmes/catalog_product_downloadable_link.md)
+ [Catalog Product Link](./readmes/catalog_product_link.md)
+ [Catalog Product Tag](./readmes/catalog_product_tag.md)
+ [Catalog Product Tier Price](./readmes/catalog_product_tier_price.md)
+ [Catalog Product Type](./readmes/catalog_product_type.md)
+ [Catalog Inventory Stock Item](./readmes/catalogInventory_stock_item.md)
+ [Checkout Cart](./readmes/checkout_cart.md)
+ [Checkout Cart Coupon](./readmes/checkout_cart_coupon.md)
+ [Checkout Cart Customer](./readmes/checkout_cart_customer.md)
+ [Checkout Cart Payment](./readmes/checkout_cart_payment.md)
+ [Checkout Cart Product](./readmes/checkout_cart_product.md)
+ [Checkout Cart Shipping](./readmes/checkout_cart_shipping.md)
+ [Core](./readmes/core.md)
+ [Customer](./readmes/customer.md)
+ [Customer Address](./readmes/customer_address.md)
+ [Customer Group](./readmes/customer_group.md)
+ [Directory Country](./readmes/directory_country.md)
+ [Directory Region](./readmes/directory_region.md)
+ [Sales Order](./readmes/sales_order.md)
+ [Sales Order Credit Memo](./readmes/sales_order_credit_memo.md)
+ [Sales Order Invoice](./readmes/sales_order_invoice.md)
+ [Sales Order Shipment](./readmes/sales_order_shipment.md)
+ [Store](./readmes/store.md)

## API Docs

Response:
  ?oauth_token=a0dd76f852a4b2ebe004b709cbba36cf&oauth_token_secret=0f958b7b0a23c209cb3289138b3275f8


REST Resources
The Magento REST API allows you to manage customers, customer addresses, sales orders, inventory, and products. REST API is organized into the following categories:

Products
Retrieve the list of products, create, update, and delete a product.
Resource Structure: http://magentohost/api.php?type=rest&/products&oauth_token=a0dd76f852a4b2ebe004b709cbba36cf&oauth_token_secret=0f958b7b0a23c209cb3289138b3275f8
Product Categories
Retrieve the list of categories assigned to a product, assign, and unassign the category to/from the specific product.
Resource Structure: http://magentohost/api/rest/products/:productId/categories
Product Images
Retrieve the list of images assigned to a product, add, update, and remove an image to/from the specific product.
Resource Structure: http://magentohost/api/rest/products/:productId/images
Product Websites
Retrieve the list of websites assigned to a product, assign, and unassign a website to/from the specific product.
Resource Structure: http://magentohost/api/rest/products/:productId/websites
Customers
Retrieve the list of customers, create, delete a customer, and update the customer information.
Resource Structure: http://magentohost/api/rest/customers
Customer Addresses
Retrieve the list of customer addresses, create, update, and delete the customer address.
Resource Structure: http://magentohost/api/rest/customers/:customerId/addresses
Inventory
Retrieve the list of stock items and update required stock items.
Resource Structure: http://magentohost/api/rest/stockitems
Sales Orders
Retrieve the list of sales orders as well as the specific order information.
Resource Structure: http://magentohost/api/rest/orders
Order Items
Retrieve order items for the specific order.
Resource Structure: http://magentohost/api/rest/orders/:orderId/items
Order Addresses
Retrieve information on order billing and shipping addresses for the specific order.
Resource Structure: http://magentohost/api/rest/orders/:orderId/addresses
Order Comments
Retrieve order comments for the specific order
Resource Structure: http://magentohost/api/rest/orders/:orderId/comments
