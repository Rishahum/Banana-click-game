const userModel = require('../models/User')

module.exports.Blocked=async function(req,res){
    const { email } = req.body;
  
    try {
        const user = await userModel.findOneAndUpdate(
          { email },
          { isBlocked: true }, 
          { new: true } 
        );
        if (user) {
          return res.status(200).json({ message: `User ${email} has been blocked.` });
        } else {
          return res.status(404).json({ message: `User ${email} not found.` });
        }
      } catch (error) {
        console.error("Error blocking user:", error);
        res.status(500).json({ message: 'Error blocking user.' });
      }
}

module.exports.UnBlocked=async function(req,res){
    const { email } = req.body;
  
    try {
        const user = await userModel.findOneAndUpdate(
          { email },
          { isBlocked: false }, 
          { new: true } 
        );
        if (user) {
          return res.status(200).json({ message: `User ${email} has been blocked.` });
        } else {
          return res.status(404).json({ message: `User ${email} not found.` });
        }
      } catch (error) {
        console.error("Error blocking user:", error);
        res.status(500).json({ message: 'Error blocking user.' });
      }
}


