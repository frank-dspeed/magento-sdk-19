// external dependencies
const Promise = require('bluebird');
const Magento = require(__dirname+'/magento');
const _ = require('lodash');

const newMagento = (connection) => {
  let value = Promise.promisifyAll(new Magento(connection));
  _.forOwn(value, v => Promise.promisifyAll(v));
  return value;
};

// Exports the Main magento shop Connection
module.exports = function(options) {
	// exports always a new Promiseifyed MagentoApi
  return newMagento(options.connection);
};
