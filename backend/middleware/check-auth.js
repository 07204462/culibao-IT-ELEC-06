const jwt = require("jsonwebtoken");  
  
module.exports = (req, res, next)=>{  
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 
            "A_very_long_string_for_our_secret");
        rea.userData = {email: decodedToken.email, userId: decodedToken.userId};  
        next();
        }catch(error){  
          res.status(401).json({message: "Auth Failed"});  
        } 
}; 