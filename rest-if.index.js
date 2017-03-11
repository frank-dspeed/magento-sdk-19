// Exports magento 1.9 Api Functions
// creates a API Client to Expose Models
// http://inchoo.net/magento/configure-magento-rest-and-oauth-settings/
const getT = require('./getToken');
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

// Offers OAuth1.0a Endpoint for magento Integration.
module.exports = function (connection){
    // if this.token = null
    // run getAuthToken

    this.opt = connection;
    this.getAuthToken = new getT(connection);
      //       this.opt.token= connection.token;
      //      this.opt.secret= connection.tokenSecret;
    this.token = {};

    var querystring = require('querystring');
    var Joi = require('joi');
    this.product = {};
    // this.product.path = require('url').resolve(this.options.baseUrl, 'products');
    // this.product.fullPath = this.makePath(this.product.path);

    // Product schema
    this.product.productSchema = Joi.object().keys({
      type_id: Joi.string().allow('simple').required(),
      sku: [Joi.string().required(), Joi.number().required()],
      name: Joi.string().required(),
      price:[Joi.string().required(), Joi.number().required()],
      status: Joi.string().required(),
      visibility:  Joi.string().required(),
      description:  Joi.string().required(),
      short_description:  Joi.string().required()
    });

    this.product.updateProductSchema = this.product.productSchema = {
        type_id: Joi.string().allow('simple'),
        attribute_set_id: Joi.number(),
        sku: [Joi.string(), Joi.number()],
        name: Joi.string(),
        url_key: Joi.string(),
        custom_design: Joi.string(),
        meta_title: Joi.string(),
        meta_description: Joi.string(),
        page_layout: Joi.string(),
        options_container: Joi.string(),
        country_of_manufacture: Joi.string(),
        msrp_enabled: Joi.number(),
        msrp_display_actual_price_type: Joi.number(),
        gift_message_available: Joi.number(),
        price: [Joi.string(), Joi.number()],
        special_price: Joi.string(),
        weight: Joi.string(),
        msrp: Joi.string(),
        status: Joi.number().allow([1, 2]),
        visibility: Joi.number().allow([1,2,3,4]),
        tax_class_id: Joi.number(),
        description: Joi.string(),
        short_description: Joi.string(),
        meta_keyword: Joi.string(),
        custom_layout_update: Joi.string()
    };

    // get product
    this.product.get = function (id, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
            options = {};
        } else {
            options = options || {};
        }
        this.request.get(this.product.fullPath + '/' + id, function (error, httpResponse, body) {
            return callback(error, httpResponse, body);
        });
    };

    this.product.add = function (product, options, callback, remoteProductId) {
        var self = this,
            isEdit = !!remoteProductId;

        if (_.isFunction(options)) {
            callback = options;
            options = {};
        } else {
            options = options || {};
        }

        Joi.validate(product, this.product.isEdit ? 'updateProductSchema': ['productSchema'], {
            allowUnknown: true,
            skipFunctions: true
        }, function (err, value) {
            if (err) {
                return callback(err, null);
            }
            this.request[isEdit ? 'put' : 'post']({
                url: self.fullPath + (isEdit ? '/' + remoteProductId : ''),
                body: product
            }, function (err, httpResponse, body) {
                if (err) {
                    return callback(err, httpResponse, body);
                }
                // Probably request was successful
                if (httpResponse.statusCode === 200) {
                    // httpResponse return the url of the product under header location
                    var productId = isEdit ? remoteProductId : parseInt(path.basename(httpResponse.headers.location), 10);
                    if (productId) {
                        this.product.get(productId, function (err, httpResponse1, body1) {
                            if (err) {
                                return callback(err, httpResponse, body);
                            }
                            return callback(null, httpResponse, body1);
                        });
                        return;
                    } else {
                        return callback('Unable to get remote product id.', httpResponse, body);
                    }
                }

                if (body.messages && body.messages.error) {
                    return callback(body.messages.error, httpResponse, undefined);
                }
                return callback('Undetermined error.', httpResponse, body);
            });
        });
    };

    this.product.update = function (remoteId, product, options, callback) {
        this.product.add(product, options, callback, remoteId);
    };

    this.product.addImage = function (id, productImage, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
            options = {};
        } else {
            options = options || {};
        }

        this.request.post({
            url: this.product.fullPath + '/' + id + '/images',
            body: productImage
        }, function (err, httpResponse, body) {
            if (err) {
                return callback(err, httpResponse, body);
            }
            if (httpResponse.statusCode === 200) {
                var imageId = parseInt(path.basename(httpResponse.headers.location), 10);
                if (imageId) {
                    return callback(null, httpResponse, {
                        id: imageId
                    });
                } else {
                    return callback('Unable to get remote image id.', httpResponse, body);
                }
            }
            if (body.messages && body.messages.error) {
                return callback(body.messages.error, httpResponse, undefined);
            }
            return callback('Undetermined error.', httpResponse, body);
        });
    };

    this.product.assignCategory = function (id, categoryId, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
            options = {};
        } else {
            options = options || {};
        }

        this.request.post({
            url: this.product.fullPath + '/' + id + '/categories',
            body: {
                category_id: categoryId
            }
        }, function (err, httpResponse, body) {
            if (err) {
                return callback(err, httpResponse, body);
            }
            if (httpResponse.statusCode === 200) {
                return callback(null, httpResponse, body)
            }
            if (body.messages && body.messages.error) {
                return callback(body.messages.error, httpResponse, undefined);
            }
            return callback('Undetermined error.', httpResponse, body);
        });
    };

    this.product.removeCategory = function (id, categoryId, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
            options = {};
        } else {
            options = options || {};
        }

        this.request.del({
            url: this.product.fullPath + '/' + id + '/categories/' + categoryId
        }, function (err, httpResponse, body) {
            if (err) {
                return callback(err, httpResponse, body);
            }
            if (httpResponse.statusCode === 200) {
                return callback(null, httpResponse, body)
            }
            if (body.messages && body.messages.error) {
                return callback(body.messages.error, httpResponse, undefined);
            }
            return callback('Undetermined error.', httpResponse, body);
        });
    };

    this.product.getCategories = function (id, options, callback) {
        if (_.isFunction(options)) {
            callback = options;
            options = {};
        } else {
            options = options || {};
        }

        this.request.get({
            url: this.product.fullPath + '/' + id + '/categories'
        }, function (err, httpResponse, body) {
            if (err) {
                return callback(err, httpResponse, body);
            }
            if (httpResponse.statusCode === 200) {
                return callback(null, httpResponse, body)
            }
            if (body.messages && body.messages.error) {
                return callback(body.messages.error, httpResponse, undefined);
            }
            return callback('Undetermined error.', httpResponse, body);
        });
    };


  return this;


/*
  this.order: {
    get: function() {


    },
    set: function() {

    }
  },
  this.orders: {
    get: function() {

    }
  }
  this.products: {
    get: function() {

    }
  }
  this.product: {
    get: function() {

    }
  }
  return this
*/
}
