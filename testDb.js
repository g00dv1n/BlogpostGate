let mongoose = require('./db');

let db = mongoose.connection.db;

console.log('test');


db.once('open', function() {
    console.log('connect to DB');
    db.createCollection('posts');

});