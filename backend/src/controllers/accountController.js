const {PrismaClient} = require('@prisma/client'),
      prisma = new PrismaClient(),
      { z } = require('zod');

const accountSchema = z.object({ name:z.string().min(1), balance:z.number().optional() });

exports.createAccount = async (req,res,next)=>{
  try {
    const data = accountSchema.parse(req.body);
    const acc = await prisma.account.create({data:{...data,userId:req.user.id}});
    res.json(acc);
  } catch(e){ next(e); }
};

exports.getAccounts = async (req,res,next)=>{
  try {
    const all = await prisma.account.findMany({where:{userId:req.user.id}});
    res.json(all);
  } catch(e){ next(e); }
};

exports.getAccount = async (req,res,next)=>{
  try {
    const acc = await prisma.account.findUnique({where:{id:+req.params.id}});
    res.json(acc);
  } catch(e){ next(e); }
};

exports.updateAccount = async (req,res,next)=>{
  try {
    const data = accountSchema.partial().parse(req.body);
    const acc = await prisma.account.update({where:{id:+req.params.id},data});
    res.json(acc);
  } catch(e){ next(e); }
};

exports.deleteAccount = async (req,res,next)=>{
  try {
    await prisma.account.delete({where:{id:+req.params.id}});
    res.json({message:'Deleted'});
  } catch(e){ next(e); }
};
