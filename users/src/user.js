const mongoose = require("mongoose");
const PostSchema = require("./post");
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
    age: Number,
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogPost" }],
});

UserSchema.virtual("postCount").get(function () {
    return this.posts.length;
});

const User = mongoose.model("user", UserSchema);
//User represents not a single user but entire collection of data

module.exports = User;
