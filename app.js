/**
 * Example REST API + simple web server
 * User: Gyula Szalai <gyszalai@gmail.com>
 * Date: 23/09/13
 */

var application_root = __dirname;
var express = require('express');
var path = require('path');
var html = require('html');
var app = express();

var db = require('./config/db');

var TrainerProvider = require('./providers/TrainerProvider').TrainerProvider;
var trainerProvider = new TrainerProvider(db);

// Config
app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use("/", express.static(path.join(application_root, "public")));
});

app.get('/', function(req, res) {
    res.redirect('/index.html');
});

app.get('/trainer/getall', function(req, res){
    trainerProvider.getAll(function(err, result){
        if(err) res.end('!' + err);
        else {
            res.end(JSON.stringify(result));
        }
    });
});

app.get('/trainer/:id', function(req, res) {
    trainerProvider.find(req.params.id, function(err, result){
        if(err) res.end('!' + err);
        else {
            res.end(JSON.stringify(result));
        }
    });
});

app.post('/trainer/register', function(req, res) {
    var trainer = req.body;
    trainerProvider.insert(trainer, function(err, result){
        if(err) res.end('!' + err);
        else {
            res.end(JSON.stringify(result));
        }
    });
});

app.listen(8100);