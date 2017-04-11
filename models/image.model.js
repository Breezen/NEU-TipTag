module.exports = function (mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var imageSchema = Schema({
        task: { type: ObjectId, ref: "Task" },
        url: String,
        tag: String,
        dateCreated: { type: Date, default: Date.now }
    });

    return mongoose.model("Image", imageSchema);
};