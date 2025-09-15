import React, { useState } from 'react';
import '../../styles/bidForm.css';

const BidForm = ({ product, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getHighestBid = () => {
        if (!product?.bids || product.bids.length === 0) {
            return product.basePrice;
        }
        const highestBid = Math.max(...product.bids.map(bid => bid.amount));
        return highestBid;
    };

    const highestBid = getHighestBid();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const bidAmount = parseFloat(amount);

        if (bidAmount <= highestBid) {
            setError(`Your bid must be higher than the current highest bid of $${highestBid}.`);
            return;
        }

        if (bidAmount <= product.basePrice) {
            setError(`Your bid must be higher than the base price of $${product.basePrice}.`);
            return;
        }

        onSubmit({ productId: product._id, amount: bidAmount })
            .then(() => {
                setSuccess('Your bid has been placed successfully!');
                setAmount('');
            })
            .catch(err => {
                setError('Failed to place bid. Please try again.');
            });
    };

    return (
        <form className="bid-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="bid-input-container">
                <input
                    type="number"
                    placeholder="Bid Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={highestBid + 1}
                    required
                />
                <button type="submit">Place Bid</button>
            </div>
        </form>
    );
};

export default BidForm;
