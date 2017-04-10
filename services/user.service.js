var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, models) {

    app.post("/api/register", register);
    app.post("/api/login", passport.authenticate("local"), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.get("/api/users", findUsers);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));

    var userModel = models.userModel;

    function serializeUser(user, done) {
        done(null, user);
    }
    
    function deserializeUser(user, done) {
        userModel.findById(user._id, function (err, user) {
            done(err, user);
        });
    }
    
    function localStrategy(username, password, done) {
        userModel.findOne({username: username, password: password}, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username/password.' }); }
            return done(null, user);
        });
    }

    function register(req, res) {
        var user = req.body;
        userModel.create(user, function (err, user) {
            if (err) res.status(400).send(err);
            else {
                req.login(user, function (err) {
                    if (err) res.status(400).send(err);
                    else res.json(user);
                });
            }
        });
    }

    function login(req, res) {
        res.json(req.user);
    }
    
    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : false);
    }

    function findUsers(req, res) {
        userModel.find({}, function (err, users) {
            if (err) res.status(500).send(err);
            else res.json(users);
        });
    }
};