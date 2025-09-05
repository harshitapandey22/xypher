require('dotenv').config();
const express = require('express'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    app = express();
    
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
    
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const categoryRoutes = require('./routes/category');
const txnRoutes = require('./routes/transaction');
const goalRoutes = require('./routes/goal');
const contactRoutes = require('./routes/contact');

app.use(express.json());
app.use(cookieParser());   
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/transaction', txnRoutes);
app.use('/api/goal', goalRoutes);
app.use('/api/contact', contactRoutes);

app.use(require('./middleware/errorHandler'));
app.get("/ping", (req, res) => {res.send("Hello World!");});

const PORT = process.env.PORT || 6000;
app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));
