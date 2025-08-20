const express = require('express');
const Product = require('../models/Product');
const Bid = require('../models/Bid');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/products', auth(['admin']), async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get('/products', auth(['admin']), async (req, res) => {
    try {
        const products = await Product.find().populate('bids');
        res.json(products);
    } catch (err) {
        res.status(400).send(err.message);
    }
});



// List of Products
// Get All Products (Admin only)
router.get('/products', auth(['admin']), async (req, res) => {
    try {
        const products = await Product.find().populate('bids');
        res.json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Single Product (Admin only)
router.get('/products/:id', auth(['admin']), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('bids');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Edit Product (Admin only)
router.put('/products/:id', auth(['admin']), async (req, res) => {
    try {
        const { name, description, basePrice, biddingDeadline } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, basePrice, biddingDeadline },
            { new: true }
        );
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete Product (Admin only)
router.delete('/products/:id', auth(['admin']), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Existing product routes (Create, Get All, Get Single, Edit, Delete)

// Get All Bids for a Product (Admin only)
router.get('/products/:productId/bids', auth(['admin']), async (req, res) => {
    try {
        const bids = await Bid.find({ product: req.params.productId }).populate('user', 'username');
        if (!bids.length) {
            return res.status(404).json({ error: 'No bids found for this product' });
        }
        res.json(bids);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a Bid (Admin only)
router.put('/bids/:bidId', auth(['admin']), async (req, res) => {
    try {
        const { amount } = req.body;
        const bid = await Bid.findByIdAndUpdate(
            req.params.bidId,
            { amount },
            { new: true }
        ).populate('user', 'username');
        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }
        res.json(bid);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Delete a Bid (Admin only)
router.delete('/bids/:bidId', auth(['admin']), async (req, res) => {
    try {
        const bid = await Bid.findByIdAndDelete(req.params.bidId);
        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        // Remove bid reference from the product
        await Product.updateOne(
            { _id: bid.product },
            { $pull: { bids: req.params.bidId } }
        );

        res.json({ message: 'Bid deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});







module.exports = router;




