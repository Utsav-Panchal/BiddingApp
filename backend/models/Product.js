const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    basePrice: { type: Number, required: true },
    biddingDeadline: { type: Date, required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },],

    //  For a winner Selection
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
});

module.exports = mongoose.model('Product', productSchema);
