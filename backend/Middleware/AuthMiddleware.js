// const jwt = require("jsonwebtoken");
// const asyncHandler = require('express-async-handler')
// const Admin = require("../Models/user");

// module.exports = asyncHandler(
//     async (req,res,next) => {
//         let token;
//         if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")
//         )
//         // {
//         //     console.log(token)
//         // }
//            try {
//             token = req.headers.authorization.split(" ")[1]
//             const decoded = jwt.verify(token,process.env.JWT_SECRET);
//             console.log(decoded);
//             req.admin = await Admin.findById(decoded._id).select("-password")
//             next();
//             // console.log(req.user);
//            } catch (error) {
//                 console.error(error)
//                 res.status(404).json({
//                     message: "Not Authorized, no token",
//                   });
//            }
        
      
//         if(!token){
//              res.status(404).json({
//                 message: "Not Authorized, no token",
//               });
//         }
//     }
// )