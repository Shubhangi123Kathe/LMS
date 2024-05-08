const {sendDataJson, sendPdfData}=require("../controllers/sendDownloadController");
const {handleCompletionRequest}=require('../controllers/completionController');
const express=require("express");
const path=require("path");
const mainDirPath=require("../mainDirPath");
const contentRouter=express.Router();

const {protectedRoute}=require("../controllers/authController");

let fileDir=path.join(mainDirPath, '/private');


contentRouter.use(protectedRoute);
contentRouter.route("/downloadInfo/:grade")
.get(sendDataJson)
;

contentRouter.route("/content")
.post(sendPdfData);

contentRouter.route("/completion/:state/:id/:grade")
.get(handleCompletionRequest)


module.exports=contentRouter;   