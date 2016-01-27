var db     = require('./mongo.js');
var Post  = db.dataInit('posts');
var multer = require('multer');
var upload = multer({ dest: 'webapp/uploads/' });


// timeParser = require('./timeParse.js');


module.exports = function(app){

  // index page 
  app.get('/', function(req, res) {
    res.render('pages/index');
  });

  app.get('/all_posts', function(req,res){
    res.render('pages/all_posts');
  });

  app.get('/post_form', function(req,res){
    res.render('pages/post_form');
  });

  app.post('/post_form', function(req,res){
    console.log(req.body, req.file);
    // Post.create({first_name:req.body.fname,last_name:req.body.lname,email:req.body.email,reflection:req.body.reflection}, function(err,doc){
    //   if(err) res.send(err);
    //   res.status(200).send(doc);
    // });
  });
};