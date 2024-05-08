const {contentModel}=require("../models/contentModel");
const path=require("path");

const fs=require("fs");
module.exports.sendDataJson=async function(req, res){
    let grade=req.params.grade;
    try {
        let data=await contentModel.find({grade: grade});
        if(data){
            res.json(data);
        }
        else{
            res.json({
                message: "no data available"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports.sendPdfData=async function (req, res){
    const link=path.join(path.dirname(__dirname), "/downloadableData", req.body.link);
    if (!fs.existsSync(link)) {
        return res.status(404).json({ error: 'File not found' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.sendFile(link);
}