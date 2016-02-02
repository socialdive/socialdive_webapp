var express = require('express');
var path = require('path');
// var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// var jade = require('jade');
// // compile 
// var fn = jade.compile('string of jade', options);
// var html = fn(locals);
 
// // render 
// var html = jade.render('string of jade', merge(options, locals));
 
// // renderFile 
// var html = jade.renderFile('filename.jade', merge(options, locals));

app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});