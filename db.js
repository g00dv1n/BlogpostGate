/**
 * Created by g00dv1n on 21.09.16.
 */

let mongoose = require('mongoose');
let config = require('./config');


mongoose.Promise = global.Promise;
console.log(config.mongoUrl);
mongoose.connect(config.mongoUrl);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


module.exports = mongoose;