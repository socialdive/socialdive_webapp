var express = require('express');
var router = express.Router();

var db     = require('./mongo.js');
var Post  = db.dataInit('posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Social Dive' });
});

router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'POSTS' });
});

router.get('/post_form', function(req, res, next) {
  res.render('post_form', { title: 'POST FORM' });
});

// ***
// Inserts a new entry into the database
// ***
router.post('/post_form', function(req, res, next){
    // console.log("it works");
    // console.log(req.body);
    Post.count(function(err,count){
      Post.create({first_name:req.body.fname,last_name:req.body.lname,email:req.body.email,photo:req.body.photo}, function(err,doc){
        if(err) res.send(err);
        res.status(200).send(doc);
      });
    });
  });

module.exports = router;
