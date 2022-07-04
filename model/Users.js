const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true,
    },
    rollNum: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}
)

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;