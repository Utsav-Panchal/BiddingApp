import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserBids, updateBid, deleteBid } from '../services/bids';
import BidHistory from '../components/user/BidHistory';
import BidManagement from '../components/admin/BidManagement';
import '../styles/bids.css';

const BidsPage = () => {
    const { user } = useContext(AuthContext);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        if (user?.role === 'admin') {
            // Fetch all bids for admin
        } else {
            getUserBids().then((res) => setBids(res.data));
        }
    }, [user]);

    const handleUpdateBid = async (bidId, data) => {
        await updateBid(bidId, data);
        const res = await getUserBids();
        setBids(res.data);
    };

    const handleDeleteBid = async (bidId) => {
        await deleteBid(bidId);
        const res = await getUserBids();
        setBids(res.data);
    };

    return (
        <div className="bids-page">
            <h1>{user?.role === 'admin' ? 'All Bids' : 'My Bids'}</h1>
            {user?.role === 'admin' ? (
                bids.map(bid => (
                    <BidManagement
                        key={bid._id}
                        bid={bid}
                        onUpdate={handleUpdateBid}
                        onDelete={handleDeleteBid}
                    />
                ))
            ) : (
                <BidHistory bids={bids} />
            )}
        </div>
    );
};

export default BidsPage;
