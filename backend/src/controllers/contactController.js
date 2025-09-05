const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const saved = await prisma.contactMessage.create({
      data: { name, email, message }
    });
    res.status(201).json({ success: true, message: 'Received!', id: saved.id });
  } catch (err) {
    next(err);
  }
};
