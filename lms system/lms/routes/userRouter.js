const express=require("express");
const userRouter=express.Router();
const {login, signup, protectedRoute, logout, forgetPassword, resetPassword, accessConfirm, isAuthorized}=require("../controllers/authController");

const {getUser, deleteUser, updateUser, isLogged, getMobileNumber}=require("../controllers/userController");
userRouter.route("/login")
.post(login)

userRouter.route("/signup")
.post(signup)

userRouter.route("/logout")
.get(logout)

userRouter.route("/forgetPassword")
.post(forgetPassword)

userRouter.route("/resetPassword/:token")
.post(resetPassword)

userRouter.route("/confirm/:token")
.get(accessConfirm)

userRouter.use(protectedRoute);
userRouter.route("/userProfile")
.get(getUser)

userRouter.route("/getMobileNumbers")
.get(getMobileNumber)

userRouter.route("/isLogged")
.get(isLogged)

userRouter.route("/update")
.patch(updateUser)

userRouter.use(isAuthorized(['admin']));
userRouter.route('/delete/:id')
.delete(deleteUser)

userRouter.route('/isAdmin')
.get((req, res)=>{
    res.json({
        message: 1
    })
})

module.exports=userRouter;