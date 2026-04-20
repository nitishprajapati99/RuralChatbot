
const RoleAccessService = require('../Service/RoleAccessService');
const roleAccessService = new RoleAccessService;
const adminOnly = (req,res,next)=>{
try{
  
  roleAccessService.AdminAccess(req.user.role);
  
  next()
}catch(err){
  res.status(500).json({
    message:err.message,
    success:false
  })
}
}
module.exports = adminOnly
