import React from 'react';
import '../../styles/winnerCard.css';

const WinnerCard = ({ winner }) => {
    return (
        <div className="winner-card">
            <h3>{winner.product.name}</h3>
            <p>Winner: {winner.winner.username}</p>
            <p>Winning Bid: ${winner.winningBid}</p>
        </div>
    );
};

export default WinnerCard;
