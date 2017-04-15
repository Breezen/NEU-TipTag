var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use(cookieParser());
app.use(session({ secret: "process.env.SESSION_SECRET", resave: true, saveUninitialized: true }));

var passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

var models = require("./models/models")();
require("./services/services")(app, models);

var port = process.env.PORT || 3000;
app.listen(port);

var http = require("http");
setInterval(function () {
    http.get("http://tiptag.herokuapp.com");
}, 300000);