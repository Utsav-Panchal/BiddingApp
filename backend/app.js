require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const bidRoutes = require('./routes/bid');
require('./cron/winnerSelection');

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');

const app = express();



// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', bidRoutes);

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);


app.get('/api/test', (req, res) => {
    res.send('Server is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

