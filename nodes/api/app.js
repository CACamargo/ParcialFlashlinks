var os = require("os");
var pjson = require('./package.json');
var version = pjson.version;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var expressLogging = require('express-logging');
var logger = require('logops');
var request = require('request-json');
var clientLinks = request.createClient('http://links:2000/');

app.use(expressLogging(logger));

var port = process.env.PORT || 1000;

app.get('/fl/version', function(req, res) {
    clientLinks.get('fl/version', function(err, res2, body) {
        body.reference = "gateway";
        res.end(JSON.stringify(body));
    });
});


/*
Server start
*/
var server = app.listen(port, function() {
	var port = server.address().port;
	console.log("App now running on port", port);
});
