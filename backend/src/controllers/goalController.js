const { PrismaClient } = require('@prisma/client'),
      prisma = new PrismaClient(),
      { z } = require('zod'),
      distribute = require('../utils/distributeSavings');

const goalSchema = z.object({ name:z.string().min(1), target:z.number(), priority:z.number().optional() });

exports.createGoal = async (req,res,next)=>{
  try {
    const data = goalSchema.parse(req.body);
    const goal = await prisma.goal.create({data:{...data,userId:req.user.id}});
    res.json(goal);
  } catch(e){ next(e); }
};

exports.getGoals = async (req,res,next)=>{
  try {
    const goals = await prisma.goal.findMany({ where:{userId:req.user.id}, orderBy:{ priority:'asc'} });
    res.json(goals);
  } catch(e){ next(e); }
};

exports.deleteGoal = async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prisma.goal.delete({ where: { id } });
    res.json({ message: 'Goal deleted' });
  } catch (e) { next(e); }
};

exports.autoDistributeSavings = async (req,res,next)=>{
  try {
    const { amount } = req.body;
    const updatedGoals = await distribute(req.user.id, amount);
    res.json(updatedGoals);
  } catch(e){ next(e); }
};

exports.reorderGoals = async (req, res, next) => {
  try {
    const { order } = req.body;
    const updates = await Promise.all(
      order.map((goalId, idx) =>
        prisma.goal.update({
          where: { id: goalId },
          data: { priority: idx }
        })
      )
    );
    res.json(updates);
  } catch (e) { next(e); }
};

exports.resetAndDistribute = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;
    await prisma.goal.updateMany({
      where: { userId },
      data: { current: 0 }
    });
    const updates = await distribute(userId, amount);
    res.json(updates);
  } catch (e) { next(e); }
};