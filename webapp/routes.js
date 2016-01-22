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

};