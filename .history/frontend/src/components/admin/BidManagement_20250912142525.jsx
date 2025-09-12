import React, { useState } from 'react';
// import '/Users/utsavpanchal/Documents/Assignment/ShipVista/BiddingApp/frontend/src/styles/bidManagement.css';
import '../../styles/bidManagement.css';

const BidManagement = ({ bid, onUpdate, onDelete }) => {
    const [amount, setAmount] = useState(bid.amount);

    const handleUpdate = () => {
        onUpdate(bid._id, { amount });
    };

    return (
        <div className="bid-management">
            <p>User: {bid.user.username}</p>
            <p>Product: {bid.product.name}</p>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <div className="bid-actions">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => onDelete(bid._id)}>Delete</button>
            </div>
        </div>
    );
};

export default BidManagement;