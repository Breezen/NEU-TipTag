module.exports = function (app, models) {

    var passport= require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        bcrypt = require("bcrypt-nodejs");
    
    var facebookConfig = {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: process.env.FB_CALLBACK
    };

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    app.post("/api/register", register);
    app.post("/api/login", passport.authenticate("local"), login);
    app.post("/api/logout", logout);
    app.get("/api/loggedin", loggedin);
    app.get("/auth/facebook", passport.authenticate("facebook", {scope: "email"}));
    app.get("/auth/facebook/callback", passport.authenticate("facebook", {successRedirect: "/#/", failureRedirect: "/#/login"}));
    app.get("/api/users", findUsers);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", create);
    app.put("/api/user", update);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user/balance", addBalance);

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
        userModel.findOne({username: username}, function (err, user) {
            if (err) { return done(err); }
            if (user && bcrypt.compareSync(password, user.password)) return done(null, user);
            return done(null, false, { message: 'Incorrect username/password.' });
        });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel.findOne({"facebook.id": profile.id}, function (err, user) {
            if (err) return done(err);
            else {
                if (user) return done(null, user);
                else {
                    var newUser = {
                        userType: "TAGGER",
                        username: profile.id,
                        name: profile.displayName,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    userModel.create(newUser, function (err, user) {
                        if (err) return done(err);
                        else return done(null, user);
                    })
                }
            }
        });
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
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

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findById(userId, function (err, user) {
            if (err) res.status(400).send(err);
            else res.json(user);
        })
    }

    function create(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.create(user, function (err, user) {
            if (err) res.status(400).send(err);
            else res.json(user);
        })
    }

    function update(req, res) {
        var user = req.body;
        userModel.findByIdAndUpdate(user._id, {$set: user}, function (err, user) {
            if (err) res.status(400).send(err);
            else res.json(user);
        });
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.findByIdAndRemove(userId, function (err, user) {
            if (err) res.status(400).send(err);
            else res.json(user);
        })
    }

    function addBalance(req, res) {
        var uid = req.body.uid,
            delta = req.body.delta;
        userModel.findById(uid, function (err, user) {
            user.balance += delta;
            userModel.findByIdAndUpdate(uid, user, function (err, user) {
                if (err) res.status(400).send(err);
                else res.json(user);
            });
        });
    }
};