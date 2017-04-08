module.exports = function (mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var taskSchema = Schema({
        name: String,
        dateCreated: { type: Date, default: Date.now }
    });

    return mongoose.model("Task", taskSchema);
};