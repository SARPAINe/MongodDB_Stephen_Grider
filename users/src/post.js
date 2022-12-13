const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title: String,
});

module.exports = PostSchema;
