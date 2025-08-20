const cron = require('node-cron');
const Product = require('../models/Product');
const Bid = require('../models/Bid');

cron.schedule('* * * * *', async () => { // Runs every minute
    try {
        const now = new Date();
        const expiredProducts = await Product.find({
            biddingDeadline: { $lte: now },
            status: 'open'
        }).populate('bids');

        for (const product of expiredProducts) {
            if (product.bids.length > 0) {
                // Find the highest bid
                const highestBid = await Bid.findOne({ product: product._id })
                    .sort({ amount: -1 })
                    .populate('user');

                // Update product with winner and close it
                product.winner = highestBid.user._id;
                product.status = 'closed';
                await product.save();

                console.log(
                    `Winner selected for product "${product.name}": ` +
                    `User ${highestBid.user.username} with bid $${highestBid.amount}`
                );
            } else {
                // No bids were placed
                product.status = 'closed';
                await product.save();
                console.log(`No bids for product "${product.name}". Bidding closed.`);
            }
        }
    } catch (err) {
        console.error('Error in winner selection cron job:', err);
    }
});
