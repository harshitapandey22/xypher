// backend/src/server.js

require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

// --- START: MODIFIED CODE ---
const allowedOrigins = [
  'http://localhost:5173', // Your Vite frontend
  process.env.CLIENT_URL   // Keep the production URL from .env
].filter(Boolean); // Filter out undefined/null values

app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// --- END: MODIFIED CODE ---

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

const PORT = process.env.PORT || 8080; // The screenshot shows 8080, let's use that
app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));