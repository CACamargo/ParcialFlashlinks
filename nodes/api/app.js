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
var clientMetric = request.createClient('http://metric:3000/');

app.use(expressLogging(logger));

var port = process.env.PORT || 1000;

//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.get('/fl/version', function(req, res) {
    clientLinks.get('fl/version', function(err, res2, body) {
        res.end(JSON.stringify(body));
    });
});

app.get('/fl/link', function(req, res) {
    clientLinks.get('fl/link', function(err, res2, body) {
        res.end(JSON.stringify(body));
    });
});

app.post('/fl/link/add', function(req, res) {
	var data = req.body;
    clientLinks.post('fl/link/add', data, function(err, res2, body) {
        res.end();
    });
});

app.post('/fl/link/edit/:uid', function(req, res) {
	var id = req.params.uid;
	var data = req.body;
    clientLinks.post('fl/link/edit/'+id, data, function(err, res2, body) {
        res.end();
    });
});

app.post('/fl/link/delete/:uid', function(req, res) {
	var id = req.params.uid;
	var data = req.body;
    clientLinks.post('fl/link/delete/'+id, data, function(err, res2, body) {
        res.end();
    });
});

app.get('/fl/metrics', function(req, res) {
    clientMetric.get('fl/metrics', function(err, res2, body) {
        res.end(JSON.stringify(body));
    });
});

app.post('/fl/metrics/add', function(req, res) {
    var data = req.body;
    clientMetric.post('fl/metrics/add', data, function(err, res2, body) {
        res.end();
    });
});

app.post('/fl/metrics/visit/', function(req, res) {
    var data = req.body;
    clientMetric.post('fl/metrics/visit/', data, function(err, res2, body) {
        res.end();
    });
});

app.get('/fl/tag', function(req, res) {
    clientLinks.get('fl/tag', function(err, res2, body) {
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
