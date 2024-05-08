const {userModel, bcrypt}=require("../models/userModel");
const JWT=require("jsonwebtoken");
const jwtKey=require("../keys/jwtKey");
const {sendMail}=require("../utility/nodemailer");
const adminEmail=require("../keys/adminEmail");
const randomString=require("randomstring");

async function login(req, res){
    let data=req.body;
    try {
        let user=await userModel.findOne({email: data.email});

        if(user){
            if((await bcrypt.compare(data.password, user.password)) && user.accessStatus==1){
                await user.updateOne({accessToken: "activated"});
                let token=user._id;
                let jwt=JWT.sign({payload: token}, jwtKey);

                res.cookie("login", jwt, {maxAge: 1000*60*60*24, httpOnly: true, sameSite: 'Lax'});
                res.json({
                    message: "login successful",
                    status: "success"
                })
            }
            else{
                res.json({
                    message: "incorrect password or access to account not given"
                })
            }
        }
        else{
            res.json({
                message: "no user found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error please try contacting the service provide"
        })
    }


}

async function signup(req, res){
    let data=req.body;
    try {
        let signupUser=await userModel.create(data);

        if(signupUser){
            res.json({
                message: "signup successful"
            })
            await sendMail("signup", signupUser);

 

            let accessTokenGen=randomString.generate();
            let isTokenChanged=await signupUser.updateOne({accessToken: accessTokenGen});

            let accessLinkGen=`${req.protocol}://${req.get('host')}/user/confirm/${accessTokenGen}`;
            console.log(accessLinkGen);
            //send token using email : node-mailer
            if(isTokenChanged){
                let accessObj={
                    name: signupUser.name,
                    uEmail: signupUser.email,
                    email: adminEmail,
                    role: signupUser.role,
                    accessLink: accessLinkGen
                }
                await sendMail('accessRequest', accessObj);
            }
        }
        else{
            res.json({
                message: "signup up unsuccessful"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error please try contacting the service provide"
        })
    }
}


async function protectedRoute(req, res, next) {

    try {

        const token = req.cookies.login;
        if (!token) {
            return res.status(401).json({ message: "JWT token must be provided" });
        }
        const decoded = JWT.verify(token, jwtKey);
        req.id = decoded.payload;
        next();
    
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid JWT token" });
    }

}


function isAuthorized(role){
    return async function (req, res, next){
        let uid=req.id;
        let user=await userModel.findById(uid); 
        let userRole=user.role;
        if(role.includes(userRole)){
            next();
        }
        else{
            res.json({
                message: "not authorized"
            })
        }
    }
}

function logout(req, res){
    res.cookie("login", "", {maxAge: 1});
    res.json({
        message: "logout successful"
    })
}


async function forgetPassword(req, res){
    let data=req.body;

    try {
        let user=await userModel.findOne({email: data.email});
        if(user){
            let resetTokengen=await user.resetTokenCreation();
            let isTokenChanged=await user.updateOne({resetToken: resetTokengen.genToken});
            let isExpiryAdded=await user.updateOne({resetTokenExpiry: resetTokengen.expiryTime});

            let resetPassword=`${req.protocol}://${req.get('host')}/user/resetPassword/${resetTokengen.genToken}`
            //send token using email : node-mailer

            if(isTokenChanged && isExpiryAdded){
                res.json({
                    message: "reset email sent successfully and it will expire in 5 minutes from now"
                })
                let obj={
                    email: data.email,
                    resetPasswordLink: resetPassword
                }

                await sendMail("resetPassword", obj);
            }
            else{
                res.json({
                    message: "reset email error"
                })
            }

        }
        else{
            res.json({
                message: "user not present"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "encountered some error"
        })
    }

}


async function resetPassword(req, res){
    let token=req.params.token;
    let data=req.body;

    try {
        let user=await userModel.findOne({resetToken: token});

        if(user){
            if(user.resetTokenExpiry<Date.now()){
                return res.json({
                    message: "reset token expired try again"
                });
            }

            let isPasswordReset=await user.resetPassword(data.password, data.confirmPassword);
            if(isPasswordReset){
                await user.updateOne({resetTokenExpiry: 0});
                res.json({
                    message: "password updated successfully"
                })
            }
            else{
                res.json({
                    message: "error while changing the password please check your password"
                })
            }
        }
        else{
            res.json({
                message: "reset token expired"
            })
        }
    } catch (error) {
        res.json({
            message: "error encountered while changing password"
        })
    }
}


async function accessConfirm(req, res){
    let token=req.params.token;

    try {
        let user=await userModel.findOneAndUpdate({accessToken: token}, {accessStatus: 1, accessToken: undefined});

        if(user){
            res.json({
                message: "success"
            });
        }
        else{
            res.json({
                message: "access token expired"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error"
        })
    }

}


module.exports={login, signup, protectedRoute, logout, forgetPassword, resetPassword, accessConfirm, isAuthorized};