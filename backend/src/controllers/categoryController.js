const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient(),
      { z } = require('zod');

const catSchema = z.object({ name:z.string().min(1) });

exports.createCategory = async (req,res,next)=>{
  try {
    const { name } = catSchema.parse(req.body);
    const existing = await prisma.category.findFirst({where:{ name, userId:req.user.id }});
    if(existing) return res.json(existing);
    const cat = await prisma.category.create({data:{ name, userId:req.user.id }});
    res.json(cat);
  } catch(e){ next(e); }
};

exports.getCategories = async (req,res,next)=>{
  try {
    const cats = await prisma.category.findMany({ where:{userId:req.user.id} });
    res.json(cats);
  } catch(e){ next(e); }
};
