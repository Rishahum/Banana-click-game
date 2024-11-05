const userModel = require('../models//User')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

const { Server } = require('socket.io');
const http = require('http');

const express = require('express')
const app = express();

const server = http.createServer(app);

const io = new Server(server);
module.exports.registerUser= async function(req, res){

    try{
        const {name, email, password, role} = req.body
        let user = await userModel.findOne({email})
        if(user){
            return res.status(400).json({message: "Your Account already exists. Please login"})
        }
        let salt = await  bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt)
    
        let newUser = await userModel.create({
            name,
            email,
            password: hash,
            role
        })
    
        let token = generateToken({email, role});
        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 *1000
        })
        console.log(token);
        
        res.status(201).send(newUser)
    }
    catch(error){
        console.log(error)
        res.status(500).send({message: 'Registeration failed'})
    }

}

module.exports.loginUser=async function(req,res){

    try{
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        
        
        if(!user){
            return res.status(500).send("Email or Password Incorrect")
        }
        if (user.isBlocked) {
            return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
          }
        const role= user.role
        const name = user.name
        let result = await bcrypt.compare(password, user.password)
        if(result){
            let token = generateToken({email, role});
            res.cookie("token", token,{
                httpOnly: true,
                secure: false,
                maxAge: 30 * 24 * 60 * 60 *1000
            })
            socket.emit('userLoggedIn', name);
            res.status(201).send(user.role) 
        }
    }catch(error){
        console.log(error);
        return res.status(500).send({message: 'Internal Server Error'})
    }

}

module.exports.logout=async function(req,res){
            res.cookie("token", "",{
                httpOnly: true,
                secure: true,
            })
            res.status(201).send("logged out successfully") 
}

module.exports.getUserProfile=async function(req,res){
    try {
        console.log(req.user)
        res.status(200).send("loggedin hai app");
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
