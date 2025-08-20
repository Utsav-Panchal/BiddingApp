const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);
