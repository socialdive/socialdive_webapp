var express = require('express');
var router = express.Router();

var db     = require('./mongo.js');
var Post  = db.dataInit('posts');

// Multer photo uploads
var multer = require('multer');
var upload = multer({ dest: 'webapp/uploads/' });
var fs = require('fs');
var mongoose = require('mongoose');

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
    console.log(req.body, req.file);
    // Post.count(function(err,count){
    //     Post.create({first_name:req.body.fname,last_name:req.body.lname,email:req.body.email,reflection:req.body.reflection,photo:req.body.photo}, function(err,doc){
    //         if(err) res.send(err);
    //         res.status(200).send(doc);
    //     });
    // });
    
    var dirname = require('path').dirname(__dirname);
    var filename = req.file.name;
    var path = req.file.path;
    var type = req.file.mimetype;

    var read_stream =  fs.createReadStream(dirname + '/' + path);

    var Grid = require('gridfs-stream');
    Grid.mongo = mongoose.mongo;

    var conn = mongoose.createConnection(process.env.DB_CONNECT);
    // var conn = mongoose.createConnection(..);
    
    conn.once('open', function () {
        var gfs = Grid(conn.db);
        var postForm = { "first_name":req.body.fname, "last_name":req.body.lname, "email":req.body.email, "reflection":req.body.reflection };

        var writestream = gfs.createWriteStream({
          filename: filename,
          metadata: postForm
        });
        read_stream.pipe(writestream);
        // all set!
        res.send().status(204);
    })
});

module.exports = router;
