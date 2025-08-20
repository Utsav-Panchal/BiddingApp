const express = require('express');
const Bid = require('../models/Bid');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();


// Place a Bid (User only)
router.post('/bids', auth(['user']), async (req, res) => {
    try {
        const { productId, amount } = req.body;
        const product = await Product.findById(productId);

        // Check if product exists and bidding is open
        if (!product || new Date() > product.biddingDeadline) {
            return res.status(400).send('Bidding is closed');
        }

        // Find the highest current bid for this product
        const highestBid = await Bid.findOne({ product: productId }).sort({ amount: -1 });

        // Check if the new bid is higher than the current highest bid
        if (highestBid && amount <= highestBid.amount) {
            return res.status(400).send('Bid too low');
        }

        // Create and save the new bid
        const bid = new Bid({ amount, user: req.user.id, product: productId });
        await bid.save();

        // Add the bid to the product's bids array
        product.bids.push(bid._id);
        await product.save();
        res.status(201).json(bid);
    } catch (err) {
        res.status(400).send(err.message);
    }
});



// Get List of Available Products for Bidding (User only)
router.get('/products/available', auth(['user']), async (req, res) => {
    try {
        const now = new Date();
        const availableProducts = await Product.find({
            biddingDeadline: { $gt: now },
            status: 'open'
        }).sort({ biddingDeadline: 1 }); // Sort by nearest deadline

        res.json(availableProducts);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
