const Jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
   
    // console.log("Middleware reached");
    // console.log("Headers:", req.headers.authorization); // Debugging line to check the headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      req.user = null;
      return next();
      // return res.status(401).json({ meassage: "Access denied. No authorized access", success: false })
    }
    const token = authHeader.split(' ')[1];//extract token part from the Authorization inside header
    const decode = Jwt.verify(token, process.env.SECRET_KEY);
    // console.log("DECODED TOKEN:", decode);
    req.user = { id: decode.id, role: decode.role };
    // console.log("USER ID FROM TOKEN:", req.user);

    // Proceed to next middleware or controller
    return next();
  } catch  {
       req.user = null;
       return next();



  //   if (err.name === "TokenExpiredError") {
  //     return res.status(401).json({
  //       success: false,
  //       message: "Token expired. Please log in again."
  //     });
  //   }

  //   if (err.name === "JsonWebTokenError") {
  //     return res.status(403).json({
  //       success: false,
  //       message: "Invalid token."
  //     });
  //   }

  //   return res.status(500).json({
  //     success: false,
  //     message: "Authentication failed."
  //   });
  }


}

module.exports = verifyToken;