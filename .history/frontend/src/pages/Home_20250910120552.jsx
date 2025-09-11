import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getOpenProducts } from '../services/products';
import { getBids } from '../services/bids';
import ProductCard from '../components/common/ProductCard';
import BidCard from '../components/common/BidCard';
import Filter from '../components/common/Filter';
import '../styles/home.css';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [bids, setBids] = useState([]);
    const [filter, setFilter] = useState({ name: '', sort: '' });

    useEffect(() => {
        if (user?.role === 'admin') {
            getBids().then((res) => setBids(res.data));
        } else {
            getOpenProducts().then((res) => {
                console.log(res.data);
                setProducts(res.data);
            });
        }
    }, [user]);

    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value });
    };

    const filteredBids = bids.filter(bid =>
        bid.product.name.toLowerCase().includes(filter.name.toLowerCase())
    );

    const sortedProducts = [...products].sort((a, b) => {
        if (filter.sort === 'highest') return (b.highestBid || 0) - (a.highestBid || 0);
        if (filter.sort === 'lowest') return (a.highestBid || 0) - (b.highestBid || 0);
        return 0;
    });

    return (
        <div className="home">
            <h1>{user?.role === 'admin' ? 'Latest Bids' : 'Available Products'}</h1>
            {/* <Filter onFilterChange={handleFilterChange} /> */}
            <div className="content">
                {user?.role === 'admin' ? (
                    filteredBids.map((bid) => <BidCard key={bid._id} bid={bid} />)
                ) : (
                    sortedProducts.map((product) => <ProductCard key={product._id} product={product} />)
                )}
            </div>
        </div>
    );
};

export default Home;
