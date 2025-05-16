// import jwt from 'jsonwebtoken'

// const verifyToken = (req,res,next)=>{
//     const token = req.headers.authorization?.split(" ")[1];

//     if((!token)){
//         return res.status(401).json({error:"No token provided"});
//         jwt.verify(token,process.env.ACCESS_TOCKEN_SECRET,(err,decoded)=>{
//             if(err){
//                 return res.status(403).json({error:"Invalid of expired token"})
//             }
//             req.userId = decoded.userId;
//             next();
//         })
//     }
// }

// export { verifyToken }

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.userId = decoded.userId; // Attach userId to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

export { verifyToken };