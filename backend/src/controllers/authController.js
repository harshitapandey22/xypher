const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient(),
      bcrypt = require('bcrypt'),
      { z } = require('zod'),
      { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
});

exports.signup = async (req,res,next)=>{
  try {
    const { email, password, name } = signupSchema.parse(req.body);
    if(await prisma.user.findUnique({where:{email}}))
      return res.status(400).json({message:'User exists'});
    const hashed = await bcrypt.hash(password,10);
    const user = await prisma.user.create({data:{email,password:hashed,name}});
    res.json({ message:'Signed up', user:{id:user.id, email:user.email, name:user.name}});
  } catch(e){ next(e); }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

exports.login = async (req,res,next)=>{
  try {
    const { email,password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({where:{email}});
    if(!user) return res.status(400).json({message:'Invalid'});
    if(!await bcrypt.compare(password, user.password))
      return res.status(400).json({message:'Invalid'});
    const access = generateAccessToken({id:user.id});
    const refresh = generateRefreshToken({id:user.id});
    res.cookie('refreshToken', refresh, {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    res.json({ accessToken: access, user:{ id:user.id, email:user.email, name:user.name, balance:user.balance, dailyLimit:user.dailyLimit } });
  } catch(e){ next(e); }
};

exports.refresh = (req,res,next)=>{
  try {
    const token=req.cookies.refreshToken;
    if(!token) return res.sendStatus(401);
    const payload=verifyRefreshToken(token);
    const access=generateAccessToken({id:payload.id});
    const refresh=generateRefreshToken({id:payload.id});
    res.cookie('refreshToken', refresh, {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    res.json({ accessToken: access });
  } catch(e){ next(e); }
};

exports.logout = (req,res)=>{
  res.clearCookie('refreshToken');
  res.json({message:'Logged out'});
};
