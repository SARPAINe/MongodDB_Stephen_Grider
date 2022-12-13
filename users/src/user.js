const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        validate: {
            validator: (name) => {
                if (name.length > 2) return true;
                else return false;
            },
            message: (props) =>
                `Name length should be greater than 2 characters, currently given ${props.value.length} characters.`,
        },
    },
    postCount: Number,
    age: Number,
});

const User = mongoose.model("user", UserSchema);
//User represents not a single user but entire collection of data

module.exports = User;
