const mongoose=require("mongoose");
const dbLink=require("../keys/dbKey");

mongoose.connect(dbLink).then(()=>{
    console.log("post db connected");
}).catch((err)=>{
    console.log(err);
})


const postSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        enum: ['mechatronics', 'software'],
        required: true
    },
    components: {
        type: [String],
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QUsers', 
        required: true,
    },
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'QUsers'
    },
    accepted: {
        type: Boolean,
        default: false
    },

    wStatus: {
        type: Boolean,
        default: false
    },

    votes:[{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QUsers'
        },
        vote: {
            type: String,
            enum: ['upvote', 'downvote']
        }
    }]
})


const postModel=mongoose.model('QPosts', postSchema);

module.exports = {postModel};