module.exports = function (mongoose) {
    var Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

    var userSchema = Schema({
        userType: {
            type: String,
            enum: ["ADMIN", "TIPPER", "TAGGER"]
        },
        username: String,
        password: String,
        name: String,
        dateCreated: { type: Date, default: Date.now }
    });

    return mongoose.model("User", userSchema);
};