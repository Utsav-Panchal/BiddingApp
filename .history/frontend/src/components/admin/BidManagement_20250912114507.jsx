// import React, { useState } from 'react';
// // import '/Users/utsavpanchal/Documents/Assignment/ShipVista/BiddingApp/frontend/src/styles/bidManagement.css';
// import '../../styles/bidManagement.css';

// const BidManagement = ({ bid, onUpdate, onDelete }) => {
//     const [amount, setAmount] = useState(bid.amount);

//     const handleUpdate = () => {
//         onUpdate(bid._id, { amount });
//     };

//     return (
//         <div className="bid-management">
//             <p>User: {bid.user.username}</p>
//             <p>Product: {bid.product.name}</p>
//             <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//             />
//             <div className="bid-actions">
//                 <button onClick={handleUpdate}>Update</button>
//                 <button onClick={() => onDelete(bid._id)}>Delete</button>
//             </div>
//         </div>
//     );
// };

// export default BidManagement;


import React, { useEffect, useState } from 'react';
import { getProductBids, updateBid } from '../../services/bids';
import '../../styles/bidManagement.css';

const BidManagement = ({ productId }) => {
    const [bids, setBids] = useState([]);
    const [editingBid, setEditingBid] = useState(null);
    const [editAmount, setEditAmount] = useState('');

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const res = await getProductBids(productId);
                setBids(res.data);
            } catch (err) {
                console.error('Error fetching bids:', err);
            }
        };
        fetchBids();
    }, [productId]);

    const handleEdit = (bid) => {
        setEditingBid(bid);
        setEditAmount(bid.amount);
    };

    const handleUpdate = async () => {
        try {
            await updateBid(editingBid._id, { amount: editAmount });
            const res = await getProductBids(productId);
            setBids(res.data);
            setEditingBid(null);
            alert('Bid updated successfully!');
        } catch (err) {
            console.error('Error updating bid:', err);
            alert('Error updating bid');
        }
    };

    return (
        <div className="bid-management">
            <h3>Manage Bids</h3>
            <div className="bids-list">
                {bids.map(bid => (
                    <div key={bid._id} className="bid-item">
                        {editingBid && editingBid._id === bid._id ? (
                            <div className="bid-edit">
                                <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} />
                                <button onClick={handleUpdate}>Save</button>
                                <button onClick={() => setEditingBid(null)}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <p>User: {bid.user?.username || 'Unknown'}</p>
                                <p>Amount: ${bid.amount}</p>
                                <button onClick={() => handleEdit(bid)}>Edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BidManagement;
