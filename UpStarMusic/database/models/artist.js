// Todo: Create Artist Model
const mongoose = require("mongoose");
const AlbumSchema = require("./album");
const ArtistSchema = new mongoose.Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    albums: [AlbumSchema],
});
module.exports = mongoose.model("artist", ArtistSchema);
