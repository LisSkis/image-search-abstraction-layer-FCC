const mongoose = require('mongoose');

const url = 'mongodb://LisSkis:testpassword@ds245687.mlab.com:45687/url-shortener-microservice';

mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = { mongoose };
