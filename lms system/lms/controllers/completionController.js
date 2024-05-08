const { userModel } = require("../models/userModel");

module.exports.handleCompletionRequest = async function (req, res) {
    let state = req.params.state;
    let weekId = req.params.id;
    let grade = req.params.grade;

    try {
        const updated = await userModel.findOneAndUpdate(
            { "_id": req.id, "completionParams.grade": grade, "completionParams.weeks._id": weekId },
            { "$set": { "completionParams.$.weeks.$[week].status": parseInt(state) } },
            { arrayFilters: [{ "week._id": weekId }] }
        );

        if (updated) {
            res.json({
                message: "successfully updated"
            });
        } else {
            res.json({
                message: "error while updating, try again"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "there was some error in the backend"
        });
    }
};
