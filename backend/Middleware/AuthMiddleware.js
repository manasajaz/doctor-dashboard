const jwt = require('jsonwebtoken');

const AuthMiddleware = (req, res ,next) => {

    const token = req.header("Authorization")

    if(!token){
        return  res.status(401).json({error : "No Token Authorization"})
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(400).json({error:  "Token is no valid"})
    }
}   
module.exports = AuthMiddleware;