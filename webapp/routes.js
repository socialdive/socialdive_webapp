var db     = require('./mongo.js');
var posts  = db.dataInit('posts');

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
  app.post('/new_post', function(req,res){
    console.log("it works");
    // Person.count(function(err,count){
    //   Person.create({id:count,first_name:req.query.first_name,last_name:req.query.last_name,email:req.query.email,country:req.query.country}, function(err,doc){
    //     if(err) res.send(err);
    //     res.status(200).send(doc);
    //   });
    // });
  });

};