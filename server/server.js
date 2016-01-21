var bodyparser = require('body-parser')
var express = require('express');
var mongodb = require('mongodb');
var app = express();

var MongoClient = require('mongodb').MongoClient;
// var db;

// Initialize connection once
MongoClient.connect('mongodb://neighbor:flanders@ds047325.mongolab.com:47325/neighborhoodnumbers', function(err, database) {
  if(err) throw err;
app.use('/', express.static("client"));


	app.use(bodyparser.json());

	app.post('/address', function (req, res, next) {
		console.log('address')
		var inputlat = req.body.G;
		var inputlon = req.body.K;
		var lat = [inputlat - .015, inputlat + .015];
		var lon = [inputlon - .017, inputlon + .017];
		
		database.collection('crimes').find({location_1: {$gte: lon[0], $lte: lon[1]}, location_2: {$gte: lat[0], $lte: lat[1]}}, function (err, docs) {
			// docs.each(function(err, doc) {
	  //     if(doc) {
	  //       console.log(doc);
	  //     }
	  //     else {
	  //       res.end();
	  //     }
	  //   });
	  // console.log(docs)
			res.json(docs)
		})
	})

  // db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

//database
// sequelize = new Sequelize('cool', 'testuser', '1234', {
// 	dialect: 'postgres',
// 	host: 'localhost',
// 	port: 5432
// })

// //Crime stats
// var Crimes = sequelize.define('lacitycrimes', {
// 	area_num: Sequelize.STRING,
// 	area_name: Sequelize.STRING,
// 	crm_cd: Sequelize.STRING,
// 	crm_cd_desc: Sequelize.STRING,
// 	cross_street: Sequelize.STRING,
// 	date_occ: Sequelize.STRING,
// 	date_rptd: Sequelize.STRING,
// 	dr_no: Sequelize.STRING,
// 	location: Sequelize.STRING,
// 	location_1: Sequelize.REAL,
// 	location_2: Sequelize.REAL,
// 	rd: Sequelize.STRING,
// 	status: Sequelize.STRING,
// 	status_desc: Sequelize.STRING,
// 	time_occ: Sequelize.STRING,
// });


 // app.use(parseString());


	// Crimes.findAll({
	// 	where: {
	// 		location_1: { 
	// 			$between: lon
	// 		},
	// 		location_2: {
	// 			$between: lat
	// 		}
	// 	},
	// 	attributes: ['crm_cd_desc', 'location_1', 'location_2']
	// }).done(function(stuff) { res.json(stuff)})
