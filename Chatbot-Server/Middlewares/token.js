const TokenService = require('../Service/TokenService');
const tokenService = TokenService ;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      req.user = null;
      return next();
    }
    const token = authHeader.split(' ')[1];//extract token part from the Authorization inside header
    const decode = tokenService.TokenVerfier(token);
    if (!decode) {
            return next(new AppError("You are not logged in! Please login to get access.", 401));
        }
    req.user = { id: decode.id, role: decode.role };
    // Proceed to next middleware or controller
    return next();
  } catch  {
       req.user = null;
       return next();


 }


}

module.exports = verifyToken;