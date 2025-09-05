const { PrismaClient } = require('@prisma/client'),
  prisma = new PrismaClient(),
  { z } = require('zod');

const blSchema = z.object({
  balance: z.number(),
  dailyLimit: z.number(),
});

exports.getCurrentUser = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      balance: true,
      dailyLimit: true,
      initialBalance: true,
    },
  });
  res.json(user);
};

exports.setBalanceAndLimit = async (req, res, next) => {
  try {
    const { balance, dailyLimit } = blSchema.parse(req.body);
    const current = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    const data = {
      balance,
      dailyLimit,
    };
    if (current.initialBalance == null) {
      data.initialBalance = balance;
    }
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data,
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
};