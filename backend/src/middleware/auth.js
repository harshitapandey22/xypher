const { verifyAccessToken } = require('../utils/jwt');

module.exports = (req,res,next)=>{
  const auth = req.headers.authorization;
  if(!auth) return res.sendStatus(401);
  const token = auth.split(' ')[1];
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch(e){
    res.sendStatus(403);
  }
};
