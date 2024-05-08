const express=require("express");
const postRouter=express.Router();
const {protectedRoute, isAuthorized}=require("../controllers/authController");
const {getAllPosts, createPost, handleVotes, participateInProject, updateComponents, authorizeProject, unauthorizedProjects, deletePost}=require('../controllers/postController')

postRouter.use(protectedRoute);
postRouter.route('/all')
.get(getAllPosts)

postRouter.route('/create')
.post(createPost);

postRouter.route('/vote/:pid/:ud')
.get(handleVotes);

postRouter.route('/participate/:pid')
.get(participateInProject);

postRouter.route('/addComponents/:pid')
.post(updateComponents);

postRouter.use(isAuthorized(['admin']));

postRouter.route('/unauthorizedProjects')
.get(unauthorizedProjects);

postRouter.route("/authorize/:pid")
.get(authorizeProject)

postRouter.route('delete/:pid')
.delete(deletePost);

module.exports = postRouter;