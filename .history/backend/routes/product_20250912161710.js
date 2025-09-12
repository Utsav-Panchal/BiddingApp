const express = require('express');
const Product = require('../models/Product');
const Bid = require('../models/Bid');
const auth = require('../middleware/auth');
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


//     try {
//         const now = new Date();
//         const products = await Product.find({ biddingDeadline: { $lt: now }, status: 'closed' })
//             .populate('winner', 'username')
//             .populate('bids');

//         const productsWithWinners = products.map(product => {
//             const highestBid = product.bids.length > 0
//                 ? Math.max(...product.bids.map(bid => bid.amount))
//                 : null;

//             return {
//                 _id: product._id,
//                 name: product.name,
//                 description: product.description,
//                 highestBid: highestBid,
//                 winner: product.winner,
//                 bids: product.bids,
//                 biddingDeadline: product.biddingDeadline
//             };
//         });

//         res.json(productsWithWinners);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// Get product details
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            // .populate('bids')
            .populate({
                path: 'bid',
                populate: {
                    path: 'user',
                    select: 'username'
                }
            })
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

