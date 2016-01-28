var db     = require('./mongo.js');
var Post  = db.dataInit('posts');
var multer = require('multer');
var upload = multer({ dest: 'webapp/uploads/' });
var fs = require('fs');
var mongoose = require('mongoose');

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
		// console.log(req.body, req.file);

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
};