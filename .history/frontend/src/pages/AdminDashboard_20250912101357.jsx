import React, { useEffect, useState } from 'react';
import { getBids } from '../services/bids';
import { getOpenProducts } from '../services/products';
import BidCard from '../components/common/BidCard';
import ProductCard from '../components/common/ProductCard';
import '../styles/adminDashboard.css';

const AdminDashboard = () => {
    const [bids, setBids] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getBids().then((res) => setBids(res.data));
        getOpenProducts().then((res) => setProducts(res.data));
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-section">
                <h2>Open Products</h2>
                {products.slice(0, 5).map(product => <ProductCard key={product._id} product={product} />)}
            </div>
        </div>
    );
};

export default AdminDashboard;
