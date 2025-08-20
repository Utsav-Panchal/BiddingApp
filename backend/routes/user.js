const express = require('express');
const Bid = require('../models/Bid');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user's bids
router.get('/bids', auth(['user']), async (req, res) => {
    try {
        const bids = await Bid.find({ user: req.user.id })
            .populate('product', 'name description basePrice biddingDeadline status')
            .sort({ timestamp: -1 });
        res.json(bids);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get user's won products +++++++++++++++++++++++++++++ Getting error here
router.get('/won-products', auth(['user']), async (req, res) => {
    try {
        const wonProducts = await Product.find({ winner: req.user.id })
            .select('name description basePrice biddingDeadline');
        res.json(wonProducts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
