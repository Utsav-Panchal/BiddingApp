import React, { useEffect, useState } from 'react';
import { getWinners } from '../services/winners';
import WinnerCard from '../components/common/WinnerCard';
import '../styles/winners.css';

const WinnersPage = () => {
    const [winners, setWinners] = useState([]);

    useEffect(() => {
        getWinners().then((res) => setWinners(res.data));
    }, []);

    return (
        <div className="winners-page">
            <h1>Winners</h1>
            <div className="winners-list">
                {winners.map(winner => (
                    <WinnerCard key={winner._id} winner={winner} />
                ))}
            </div>
        </div>
    );
};

export default WinnersPage;
