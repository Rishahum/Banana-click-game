const userModel = require('../models/User')
const bcrypt = require('bcrypt')
module.exports.getAllUsers=async function(req,res){
    try {
        const users = await userModel.find().select("-password");

        console.log(users)
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports.addUser=async function (req, res) {
    try {
        const {name, email, password}= req.body;
        let salt = await  bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt)
        let newUser = await userModel.create({
            name,
            email,
            password: hash,
            role: "user"
        })
    
        res.send(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error posting data' });
    }

}

module.exports.updateUser = async function(req, res) {
    try {
        
        const { id, name, email } = req.body;

        let updateData = { name, email };
        

        const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
};

module.exports.deleteUser = async function(req, res) {
    try {
        const { id } = req.body;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
};