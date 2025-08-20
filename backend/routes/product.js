const express = require('express');
const Product = require('../models/Product');
const Bid = require('../models/Bid');
const router = express.Router();

// Get open products
router.get('/open', async (req, res) => {
    try {
        const now = new Date();
        const openProducts = await Product.find({
            biddingDeadline: { $gt: now },
            status: 'open'
        }).populate('bids');
        res.json(openProducts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get closed products
router.get('/closed', async (req, res) => {
    try {
        const now = new Date();
        const closedProducts = await Product.find({
            $or: [
                { biddingDeadline: { $lte: now } },
                { status: 'closed' }
            ]
        }).populate('winner', 'username').populate('bids');
        res.json(closedProducts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get winners list  +++++++++++++++++++++  Getting Error here
router.get('/winners', async (req, res) => {
    res.json([{ message: "Winners endpoint works!" }]);
});
// router.get('/winners', async (req, res) => {
//     try {
//         const winners = await Product.find({ status: 'closed', winner: { $exists: true } })
//             .populate('winner', 'username')
//             .select('name winner');
//         res.json(winners);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// Get product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('bids')
            .populate('winner', 'username');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get highest bid for a product
router.get('/:id/highest-bid', async (req, res) => {
    try {
        const highestBid = await Bid.findOne({ product: req.params.id })
            .sort({ amount: -1 })
            .populate('user', 'username');
        if (!highestBid) {
            return res.json({ message: 'No bids yet' });
        }
        res.json(highestBid);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get time remaining for bidding
router.get('/:id/time-remaining', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const now = new Date();
        const deadline = new Date(product.biddingDeadline);
        const timeRemaining = Math.max(0, deadline - now); // Return 0 if timeRemaining is negative
        res.json({ timeRemaining });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
