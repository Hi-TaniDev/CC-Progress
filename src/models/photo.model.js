const mongoose = require("mongoose");
const Photo = mongoose.model(
    "Photo",
    new mongoose.Schema({
        UserId: String,
        img: {
            data: Buffer,
            contentType: String
        }
    })
);

module.exports = Photo;