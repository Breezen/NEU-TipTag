module.exports = function (app, models) {

    app.post("/api/task", create);
    app.put("/api/task", update);
    app.get("/api/tasks", findAllTasks);
    app.get("/api/task/:tid", findTaskById);
    app.get("/api/tasks/:uid", findMyTasks);

    var taskModel = models.taskModel;

    function create(req, res) {
        var task = req.body;
        taskModel.create(task, function (err, task) {
            if (err) res.status(400).send(err);
            else res.json(task);
        });
    }

    function update(req, res) {
        var task = req.body;
        taskModel.update({_id: task._id}, {$set: task}, function (err, task) {
            if (err) res.status(400).send(err);
            else res.json(task);
        });
    }

    function findAllTasks(req, res) {
        taskModel.find({})
            .populate("tipper")
            .exec(function (err, tasks) {
                if (err) res.status(400).send(err);
                else res.json(tasks);
            });
    }

    function findTaskById(req, res) {
        var taskId = req.params.tid;
        taskModel.findById(taskId, function (err, task) {
            if (err) res.status(400).send(err);
            else res.json(task);
        });
    }
    
    function findMyTasks(req, res) {
        var userId = req.params.uid,
            role = req.query.role;
        if (role === "TIPPER") {
            taskModel.find({tipper: userId})
                .populate("tipper")
                .exec(function (err, tasks) {
                    if (err) res.status(400).send(err);
                    else res.json(tasks);
                });
        }
    }
};