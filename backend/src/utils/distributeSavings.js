const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (userId, totalAmount) => {
  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { priority: 'asc' }
  });
  const n = goals.length;
  const totalWeight = (n * (n + 1)) / 2;
  const updates = [];
  for (let i = 0; i < goals.length; i++) {
    const g = goals[i];
    const weight = n - i;
    const give = (totalAmount * weight) / totalWeight;
    const needed = g.target - g.current;
    const amt = Math.min(give, needed);
    if (amt <= 0) continue;
    const updated = await prisma.goal.update({
      where: { id: g.id },
      data: { current: { increment: amt } }
    });
    updates.push(updated);
  }
  return updates;
};