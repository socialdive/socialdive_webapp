var express = require('express');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var routes = require('./routes');


var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// file uploads are stored in uploads/ folder.
app.use('/uploads', express.static(__dirname + 'uploads'));


// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});