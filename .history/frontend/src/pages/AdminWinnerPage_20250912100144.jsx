import React, { useEffect, useState } from 'react';
import { getWinners } from '../services/winners';
import WinnerCard from '../components/common/WinnerCard';
import '../styles/adminwinners.css';

const WinnersPage = () => {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const res = await getWinners();
                setWinners(res.data);
            } catch (err) {
                console.error('Error fetching winners:', err);
            }
        };
        fetchWinners();
    }, []);

    return (
        <div className="winners-page">
            <h1>Winners</h1>
            {winners.length === 0 ? (
                <p>No winners yet.</p>
            ) : (
                <div className="winners-list">
                    {winners.map(product => (
                        <WinnerCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WinnersPage;
