import React from 'react';
import '../../styles/bidCard.css';

const BidCard = ({ bid }) => {
    return (
        <div className="bid-card">
            <p><strong>Product:</strong> {bid.product?.name}</p>
            <p><strong>User:</strong> {bid.user?.username}</p>
            <p><strong>Amount:</strong> ${bid.amount}</p>
            <p><strong>Time:</strong> {new Date(bid.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default BidCard;
