const { postModel } = require("../models/postModel");
const {userModel}=require('../models/userModel');

async function getVoteCount(postId) {
    try {
        const post = await postModel.findById(postId).populate('votes.user');

        let upvotes = 0;
        let downvotes = 0;

        post.votes.forEach(vote => {
            if (vote.vote === 'upvote') {
                upvotes++;
            } else if (vote.vote === 'downvote') {
                downvotes++;
            }
        });

        const result = upvotes - downvotes;

        return { upvotes, downvotes, result };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports.getAllPosts = async function (req, res) {
    try {
        const posts = await postModel.find({ accepted: true })
            .populate('author')
            .populate('participants')
            .populate('votes.user');

        const populatedPosts = await Promise.all(posts.map(async post => {
            const voteCount = await getVoteCount(post._id);
            return { post: post.toJSON(), voteCount: voteCount };
        }));

        if (posts) {
            res.json(populatedPosts)
        }
        else {
            res.json({
                message: "no posts available"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "there was some error in backend"
        })
    }
}

module.exports.createPost = async function (req, res) {
    let uid=req.id;
    let fData = req.body;
    let data = {
        title: fData.title,
        description: fData.info,
        topic: fData.topic,
        components: fData.components,
        author: req.id
    }

    try {
        const postCreated = await postModel.create(data);

        if (postCreated) {
            const userUpdated= await userModel.findByIdAndUpdate( uid, 
                { $push: { posts: postCreated._id} }, 
                { new: true });

            
            res.json({
                message: "post created",
                obj: postCreated
            })
        }
        else {
            res.json({
                message: "post not created"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal error"
        })
    }

}

module.exports.handleVotes = async function (req, res) {
    const userId = req.id;
    const voteType = req.params.ud; 
    const postId = req.params.pid;


    try {
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const existingVoteIndex = post.votes.findIndex(vote => vote.user.equals(userId));

        if (existingVoteIndex !== -1) {
            if (post.votes[existingVoteIndex].vote !== voteType) {
                post.votes[existingVoteIndex].vote = voteType;
            } else {
                return res.status(400).json({ error: 'User has already voted with the same vote type' });
            }
        } else {
            post.votes.push({ user: userId, vote: voteType });
        }

        await post.save();

        return res.status(200).json({ message: 'Vote handled successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports.participateInProject = async function(req, res) {
    const userId = req.id;
    const postId = req.params.pid;

    try {

        let post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Check if the user is already a participant
        const isParticipant = post.participants.some(participant => participant.equals(userId));

        if (isParticipant) {
            return res.status(400).json({ error: 'User is already a participant in this project' });
        }

        // Add the user as a participant
        post.participants.push(userId);

        // Save the updated post
        await post.save();

        return res.status(200).json({ message: 'User participated in the project successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.updateComponents = async function(req, res) {
    const userId = req.id;
    const postId = req.params.pid;
    const newComponents = req.body.components; 

    try {
        // Find the post
        let post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user is a participant in the post
        const isParticipant = post.participants.some(participant => participant.equals(userId));

        if (!isParticipant) {
            return res.status(403).json({ error: 'User is not authorized to update components in this post' });
        }

        // Push the new components to the existing components array
        post.components.push(...newComponents);

        // Save the updated post
        await post.save();

        return res.status(200).json({ message: 'Components updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.authorizeProject = async function (req, res){
    let pid=req.params.id;

    try {
        let authorized = postModel.findByIdAndUpdate(pid, {accepted: true});

        if(authorized){
            res.json({
                message: "project authorized"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports.unauthorizedProjects = async function (req, res){
    try {
        const posts = await postModel.find({ accepted: false })
            .populate('author')
            .populate('participants')
            .populate('votes.user');

        const populatedPosts = await Promise.all(posts.map(async post => {
            const voteCount = await getVoteCount(post._id);
            return { post: post.toJSON(), voteCount: voteCount };
        }));

        if (posts) {
            res.json(populatedPosts)
        }
        else {
            res.json({
                message: "no posts available"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "there was some error in backend"
        })
    }
}

module.exports.deletePost=async function (req, res){
    let pid=req.params.pid;

    try {
        let deleted=postModel.findByIdAndDelete(pid);

        if(deleted){
            res.json({
                message: "post deleted successfully"
            })
        }
        else{
            res.json({
                    message: 'faced some issue'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "there was some error in backend"
        })
    }
}