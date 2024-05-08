const {userModel, bcrypt}=require("../models/userModel");
let adminEmail=require("../keys/adminEmail");
async function getAllUsers(req, res){

    let adminId=req.id;

    let admin=await userModel.findById(adminId);

    if(admin.email!=adminEmail){
        return res.json({
            message: "only admin is allowed to see all users"
        })
    }

    try {        
        let allUsers=await userModel.find();

        if(allUsers){
            res.json(allUsers);
        }
        else{
            res.json({
                message: "error while fetching users"
            })
        }
    } catch (error) {
        res.json({
            message: "not authorized or encountered some error"
        })
    }
}

function isLogged(req, res){
    res.json({
        status: true
    })
}

async function getMobileNumber(req, res){
    try {
        let mobileData=[];
        let users=await userModel.find();

        users.forEach((user)=>{
            let data={
                name: user.name,
                role: user.role,
                mobileNumber: user.mobileNumber,
                email: user.email
            };
            
            mobileData.push(data);
        })

        res.json(mobileData);
    } catch (error) {
        res.json({
            message: "login again"
        })
    }
}

async function getUser(req, res){
    let uid=req.id;
    try {
        let user=await userModel.findById(uid);

        if(user){
            res.json(user)
        }
        else{
            res.json({
                message: "user not found error"
            })
        }
    } catch (error) {
        res.json({
            message: "login again"
        })
    }
}

async function updateUser(req, res){
    let id=req.id;
    let dataToUpdate=req.body;

    try {
        let userUpdated=await userModel.findByIdAndUpdate(id, dataToUpdate);
        
        if(userUpdated){
            res.json({
                message: "user updated"
            })
        }
        else{
            res.json({
                message: "user not found or error while updating"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal error please try again later"
        })
    }

}


async function deleteUser(req, res){
    let id=req.params.id;

    let adminId=req.id;

    let admin=await userModel.findById(adminId);

    if(admin.email!=adminEmail){
        return res.json({
            message: "only admin is allowed to delete a user"
        })
    }



    try {
        let userDeleted=await userModel.findByIdAndDelete(id);
        
        if(userDeleted){
            res.json({
                message: "user deleted"
            })
        }
        else{
            res.json({
                message: "user not found or error while deleting"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal error please try again later"
        })
    }
}

module.exports={getUser, getAllUsers, updateUser, deleteUser, isLogged, getMobileNumber};