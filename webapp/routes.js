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

	// Gets all photos from the database
	// TODO: change to get only md5 so we can use /photo/:md5 route to display.
	app.get('/all_photos', function(req,res){
		var Grid = require('gridfs-stream');
		Grid.mongo = mongoose.mongo;

		var conn = mongoose.createConnection(process.env.DB_CONNECT);
		conn.once('open', function() {
			var gfs = Grid(conn.db);
			gfs.files.find().toArray(function (err, files) {
				if (err) {
					res.json(err);
				}
				console.log(files);
			});
		});
	});

	// Displays photos via their md5 
	app.get('/photo/:md5',function(req,res){
		var Grid = require('gridfs-stream');
		Grid.mongo = mongoose.mongo;
		var md5 = req.param('md5');

		var conn = mongoose.createConnection(process.env.DB_CONNECT);
		conn.once('open', function() {
			var gfs = Grid(conn.db);
			gfs.files.find({md5: md5}).toArray(function (err, files) {
				if (err) {
					res.json(err);
				}
				if (files.length > 0) {
					var mime = 'image/jpeg';
					res.set('Content-Type', mime);
					var read_stream = gfs.createReadStream({md5: md5});
					read_stream.pipe(res);
				} else {
			    res.json('File Not Found');
				}
			});
		});
	});

	app.post('/post_form', function(req,res){
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