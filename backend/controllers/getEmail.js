const userModel = require('../models/User')

module.exports=async function(req,res){
    try {
        const users = await userModel.find().select("-password");

        console.log(users )
        res.status(200).send(req.userEmail);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
