var http = require('http');
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
var parseString = require('xml2js').parseString;
var bodyparser = require('body-parser');
var Sequelize = require('sequelize');

//database
sequelize = new Sequelize('cool', 'testuser', '1234', {
	dialect: 'postgres',
	host: 'localhost',
	port: 5432
})

//Crime stats
var Crimes = sequelize.define('lacitycrimes', {
	area_num: Sequelize.STRING,
	area_name: Sequelize.STRING,
	crm_cd: Sequelize.STRING,
	crm_cd_desc: Sequelize.STRING,
	cross_street: Sequelize.STRING,
	date_occ: Sequelize.STRING,
	date_rptd: Sequelize.STRING,
	dr_no: Sequelize.STRING,
	location: Sequelize.STRING,
	location_1: Sequelize.REAL,
	location_2: Sequelize.REAL,
	rd: Sequelize.STRING,
	status: Sequelize.STRING,
	status_desc: Sequelize.STRING,
	time_occ: Sequelize.STRING,
});

app.use('/', express.static("client"));

 // app.use(parseString());
app.use(bodyparser.json());

app.post('/address', function (req, res, next) {
	var inputlat = req.body.G;
	var inputlon = req.body.K;
	var lat = [inputlat - .015, inputlat + .015];
	var lon = [inputlon - .017, inputlon + .017];
	
	Crimes.findAll({
		where: {
			location_1: { 
				$between: lon
			},
			location_2: {
				$between: lat
			}
		},
		attributes: ['crm_cd_desc', 'location_1', 'location_2']
	}).done(function(stuff) { res.json(stuff)})
})

//Zillow API
app.get('/data', function (req, res, next) {
	request('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1a521y3ytjf_728x4&address=845+Amoroso+Pl+&citystatezip=Venice%2C+CA', function (error, response, xml) {
		var $ = cheerio.load(xml);
		var xmlresponse = $('result');
		parseString(xmlresponse, function (err, result) {
			var firstget = {};
			firstget.state = result.result.address[0].state[0];
			firstget.city = result.result.address[0].city[0];
			firstget.neighborhood = result.result.localrealestate[0].region[0].$.name;
		  		  res.json(zillowdata);

			});
		})
	})
});

app.listen(3000);