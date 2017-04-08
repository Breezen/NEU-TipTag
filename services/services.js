module.exports = function (app, models) {
    require("./user.service")(app, models);
    require("./task.service")(app, models);
};