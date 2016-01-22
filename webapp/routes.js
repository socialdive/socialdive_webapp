var db     = require('./mongo.js');
var Post  = db.dataInit('posts');

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

  // ***
  // Inserts a new entry into the database
  // ***
  app.post('/post_form', function(req,res){
    // console.log("it works");
    // console.log(req.body);
    Post.count(function(err,count){
      Post.create({first_name:req.body.fname,last_name:req.body.lname,email:req.body.email,photo:req.body.photo}, function(err,doc){
        if(err) res.send(err);
        res.status(200).send(doc);
      });
    });
  });
  
};