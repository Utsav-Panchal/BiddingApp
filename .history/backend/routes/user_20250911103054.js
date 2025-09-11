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


// Get user's won products with bid details
router.get('/won-products', auth(['user']), async (req, res) => {
    try {
        const userId = req.user.id;
        const now = new Date();

        // Find all products where the user has bid and the bidding is closed
        const products = await Product.find({
            biddingDeadline: { $lt: now },
            status: 'closed'
        })
            .populate({
                path: 'bids',
                match: { user: userId },
                options: { sort: { timestamp: -1 } }
            })
            .populate('winner', 'username');

        const userProducts = products.filter(product => {
            return product.bids.some(bid => bid.user && bid.user.equals(userId));
        }).map(product => {
            const userBid = product.bids.find(bid => bid.user.equals(userId));
            const allBids = product.bids.filter(bid => bid.user); // Ensure bids have a user
            const highestBid = allBids.length > 0
                ? Math.max(...allBids.map(bid => bid.amount))
                : null;

            return {
                _id: product._id,
                name: product.name,
                description: product.description,
                basePrice: product.basePrice,
                image: product.image,
                userBid: userBid ? userBid.amount : null,
                highestBid: highestBid,
                isWinner: product.winner && product.winner.equals(userId),
                biddingDeadline: product.biddingDeadline
            };
        });

        res.json(userProducts);
    } catch (err) {
        console.error('Error fetching won products:', err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
