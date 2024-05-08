const mongoose=require("mongoose");
const dbLink=require("../keys/dbKey");
const bcrypt=require("bcryptjs");
const emailValidator=require("email-validator");
const randomstring=require("randomstring");

mongoose.connect(dbLink).then(()=>{
    console.log("user db connected");
}).catch((err)=>{
    console.log(err);
})


const weeksSchema= new mongoose.Schema({
    week: {
        type: Number
    },
    status: {
        type: Number,
        enum: [-1,0,1,2],
        default: -1
    }
});


const completionSchema = new mongoose.Schema({
    grade: {
        type: String
    },
    weeks: [weeksSchema]
})

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        maxLength: 100,
        required: true
    },
    email:{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
        unique: true,
        validate: function (){
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8, 
        maxLength: 50
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 50,
        validate: function (){
            return (this.password==this.confirmPassword);
        }
    },
    role: {
        type: String,
        enum: ['member', 'admin'],
        required: true
    },

    completionParams: [completionSchema],

    education: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
        required: true
    },

    school:{
        type:String,
        required: true
    },

    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'QPosts'
    },
    
    resetToken: {
        type: String
    },

    resetTokenExpiry: {
        type: Number
    },

    accessToken:{
        type:String
    },

    accessStatus:{
        type: Number,
        enum: [0,1],
        default: 0
    }
});



userSchema.pre("save", function (){
    this.confirmPassword=undefined;
});

userSchema.pre("save", async function (){
    let salt=await bcrypt.genSalt();
    let hashedPassword=await bcrypt.hash(this.password, salt);
    this.password=hashedPassword;
});

userSchema.pre('save', function (next) {
    const completionParams = [];

    // Generate completion parameters for grades 4 to 10
    for (let grade = 4; grade <= 12; grade++) {
        const weeksCount = (grade <= 10) ? 32 : 40; // 32 weeks for grades 4 to 10, 40 weeks for grades 11 and 12

        const weeks = [];
        for (let week = 1; week <= weeksCount; week++) {
            weeks.push({ week, status: -1 }); // Status set to 0 for each week
        }

        completionParams.push({
            grade: `Grade_${grade}`,
            weeks
        });
    }

    this.completionParams = completionParams;

    next();
});


userSchema.methods.resetTokenCreation=async function (){
    let genToken=randomstring.generate();
    this.resetToken=genToken;
    let expiryTime=parseInt(Date.now()+(5*60*1000));
    this.resetTokenExpiry=expiryTime;

    return {genToken, expiryTime};
}


userSchema.methods.resetPassword=async function (password, confirmPassword){
    try {
        this.password=password;
        this.confirmPassword=confirmPassword;
        this.resetToken=undefined;
        this.save();
    
        return true;
    } catch (error) {
        return false;
    }
}

const userModel=mongoose.model("QUsers", userSchema);

module.exports={userModel, bcrypt};