module.exports = function (app, models) {
    app.post("/api/image", create);
    app.put("/api/image", update);
    app.delete("/api/image/:iid", deleteImage);
    app.get("/api/images/:tid", findImagesByTask);

    var imageModel = models.imageModel;

    function create(req, res) {
        var newImage = req.body;
        imageModel.create(newImage, function (err, image) {
            if (err) res.status(400).send(err);
            else res.json(image);
        })
    }

    function update(req, res) {
        var newImage = req.body;
        imageModel.update({_id: newImage._id}, newImage, function (err, image) {
            if (err) res.status(400).send(err);
            else res.json(image);
        });
    }

    function deleteImage(req, res) {
        var imageId = req.params.iid;
        imageModel.remove({_id: imageId}, function (err, image) {
            if (err) res.status(400).send(err);
            else res.json(image);
        })
    }

    function findImagesByTask(req, res) {
        var taskId = req.params.tid;
        imageModel.find({task: taskId}, function (err, images) {
            if (err) res.status(400).send(err);
            else res.json(images);
        });
    }
};