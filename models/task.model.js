module.exports = function (mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var taskSchema = Schema({
        name: { type: String, required: true },
        description: String,
        price: {type: Number, default: 0},
        tipper: { type: ObjectId, ref: "User", required: true },
        tagger: { type: ObjectId, ref: "User" },
        dateCreated: { type: Date, default: Date.now }
    });

    return mongoose.model("Task", taskSchema);
};