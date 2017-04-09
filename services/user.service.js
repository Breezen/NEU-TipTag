module.exports = function (app, models) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);

    var userModel = models.userModel;

    function createUser(req, res) {
        var user = req.body;
        userModel.create(user, function (err, user) {
            if (err) {res.send(err);}
            else {res.json(user);}
        });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, res);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findOne({username: username, password: password}, function (err, user) {
                if (err) {res.send(err);}
                else {
                    if (!user) res.sendStatus(404);
                    else res.json(user);
                }
            });
    }

    function findUserByUsername(username, res) {
        userModel
            .findOne({username: username}, function (err, user) {
                if (err) {res.send(err);}
                else {
                    if (!user) res.sendStatus(404);
                    else res.json(user);
                }
            });
    }
};