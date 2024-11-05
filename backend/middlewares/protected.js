const jwt = require('jsonwebtoken')
const userModel = require('../models/User')

module.exports =async function(req, res, next){
    if(req.cookies.token){
        try{
            const data =jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            const user =await userModel.findOne({email: data.email}).select("-password")
            req.user = user
            next()
        }catch(error){
            console.log(error)
            return res.status(500).send("not authorised")
        }
    }else{
        return res.status(500).send("You don't have permission to access")
    }
}