import React from 'react';
import '../../styles/bidHistory.css';

const BidHistory = ({ bids }) => {
    return (
        <div className="bid-history">
            <h2>My Bids</h2>
            {bids.map((bid) => (
                <div key={bid._id} className="bid-item">
                    <p>Product: {bid.product.name}</p>
                    <p>Amount: ${bid.amount}</p>
                    <p>Time: {new Date(bid.timestamp).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default BidHistory;
