module.exports = function (app, models) {

    app.post("/api/user", createUser);

    var userModel = models.userModel;

    function createUser(req, res) {
        var user = req.body;
        userModel.create(user, function (err, user) {
            if (err) {res.sendStatus(500);}
            else {res.json(user);}
        });
    }
};