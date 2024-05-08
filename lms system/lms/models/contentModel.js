const mongoose = require('mongoose');
const dbLink = require("../keys/dbKey");

mongoose.connect(dbLink).then(() => {
    console.log("content db connected");
}).catch((err) => {
    console.log(err);
});


const weeksSchema = new mongoose.Schema({
    week: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    download: [String]
});


const contentSchema = new mongoose.Schema({
    grade: {
        type: String,
        required: true
    },
    weeks: [weeksSchema]
})


const contentModel = mongoose.model("grade_wise_content", contentSchema);


module.exports = { contentModel };