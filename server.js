/**
 * Created by g00dv1n on 21.09.16.
 */
'use strict'

//let express = require('express');
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let config = require('./config');
let mongoose = require('./db');
let cron = require('node-cron');
let co = require('co');
let request = require('request-promise');




app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));



const insertJson = (json) => {
  return new Promise((resolve, reject) => {
      let db = mongoose.connection;
      let posts = db.collection('posts');
      posts.insert(json, (err, result) => {
         if (err) return reject(err);
         resolve(result);
      });
  });
};

const getAllPosts = () => {
    return new Promise((resolve, reject) => {
        let db = mongoose.connection;
        let posts = db.collection('posts');
        posts.find({}).toArray(function (err, result) {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const dropPosts = () => {
    let db = mongoose.connection;
    let posts = db.collection('posts');
    posts.drop();
};

const sendToAll = (post) => {
    let options = {
        method: 'POST',
        body: post,
        uri: '',
        json: true,
        resolveWithFullResponse: true
    };

    const urls = config.blogURLS;

    for (let i in urls) {
        options.uri = urls[i];
        request(options)
            .then((respond) => {
                console.log(urls[i]);
                console.log(respond.statusCode);
            })
           .catch((err) => {
                console.log(err);
           });
    }
};

const task = () => {
  co(function *() {
      console.log('start');
      try {
          let posts = yield getAllPosts();
          dropPosts();

          console.log(posts);

          for (let i in posts) {
              sendToAll(posts[i]);
          }

      } catch (err) {
          console.log(err.message);
      }

      console.log('end');
  });
};


app.post('/posts', (req, res) => {
    let post = req.body;

    insertJson(post)
        .then((doc) =>{
           console.log(doc);
            res.json(doc);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});


app.get('/run-task', (req, res) => {
    task();
    res.end();
});

cron.schedule('0 * * * *', () =>{
    console.log('run task!');
    task();
});


app.listen(config.PORT, () => {
   console.log(`Running on ${config.PORT} port..`);
});


