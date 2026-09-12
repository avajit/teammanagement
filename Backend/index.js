require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const prisma = require('./src/lib/prisma');
const routes = require('./src/routes/index');
const errorMiddleware = require('./src/middleware/error.middleware');

const app = express();
app.set('trust proxy', 1);

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$connect();
    res.json({ status: 'ok', message: 'Backend connected to database!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Routes
app.use('/api', routes);

// Global error handler (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
