// var db     = require('./mongo.js');
// timeParser = require('./timeParse.js');


module.exports = function(app){

  // index page 
  app.get('/', function(req, res) {
      res.render('pages/index');
  });
// ***
// Gets times for a certain summoner
// ***
// var cachedGames = [];

//   app.get('/summoner/:summoner_name', function(req,res){
//   	summoners.find({ summoner_short:req.params.summoner_name }, function(err,doc){
//   		if(err) res.send(err);
//       doc = JSON.stringify(doc);
//       doc = JSON.parse(doc);
//       games.find({ summoner_id:doc[0].summoner_id }, function(err,games){
//         cachedGames = games;
//         if(err) res.send(err);
//         res.send(games);
//       });
//   	});
//   });

};