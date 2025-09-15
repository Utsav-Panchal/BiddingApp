import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUserWonProducts } from '../services/winners';
import WinnerCard from '../components/common/WinnerCard';
import '../styles/winners.css';

const WinnersPage = () => {
    const { user } = useContext(AuthContext);
    const [wonProducts, setWonProducts] = useState([]);

    useEffect(() => {
        const fetchWonProducts = async () => {
            try {
                const res = await getUserWonProducts();
                setWonProducts(res.data.filter(product => product.isWinner));
            } catch (err) {
                console.error('Error fetching won products:', err);
            }
        };
        if (user) {
            fetchWonProducts();
        }
    }, [user]);

    return (
        <div className="winners-page">
            <h1>My Won Products</h1>
            {wonProducts.length === 0 ? (
                <p>You haven't won any products yet.</p>
            ) : (
                <div className="winners-list">
                    {wonProducts.map(product => (
                        <WinnerCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WinnersPage;
