const jwt = require('jsonwebtoken')
require('dotenv').config();

const generateTokens = (data)=>{
    return jwt.sign(data, process.env.JWT_SECRET)
}

module.exports=generateTokens;