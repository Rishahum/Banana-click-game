const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      
   
      
      console.log(data)
      if (data.role === "admin") {
       
        return next();
      } else {
        return res.status(403).send("Access denied: Admins only");
      }
    } catch (error) {
      console.error("Authorization error:", error);
      return res.status(401).send("Unauthorized access: Invalid token");
    }
  } else {
    return res.status(401).send("Unauthorized: No token provided");
  }
};
