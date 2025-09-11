import React, { useState } from 'react';
import '../../styles/bidForm.css';

const BidForm = ({ product, onSubmit }) => {
    const [amount, setAmount] = useState(product.basePrice);

    const getHighestBid = () => {
        if (!product?.bids || product.bids.length === 0) {
            return 'None yet';
        }
        const highestBid = Math.max(...product.bids.map(bid => bid.amount));
        return highestBid;
    };

    const highestBid = getHighestBid();

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ productId: product._id, amount });
    };

    return (
        <form className="bid-form" onSubmit={handleSubmit}>
            <h2>Place a Bid</h2>

            <input
                type="number"
                placeholder="Bid Amount"
                value={highestBid + 5}
                onChange={(e) => setAmount(e.target.value)}
                min={product.highestBid ? product.highestBid + 1 : product.basePrice}
                required
            />
            <button type="submit">Place Bid</button>
        </form>
    );
};

export default BidForm;
