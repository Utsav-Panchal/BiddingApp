import React from 'react';
import '../../styles/adminWinnerCard.css';

const WinnerCard = ({ product }) => {
    return (
        <div className="winner-card">
            <div className="winner-image-container">
                <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
            </div>
            <div className="winner-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>{product.basePrice}</p>
                <p>Highest Bid: ${product.highestBid}</p>
                {product.winner ? (
                    <p className="winner-name">Winner: {product.winner.username}</p>
                ) : (
                    <p className="no-winner">No winner yet</p>
                )}
                <p>Deadline: {new Date(product.biddingDeadline).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default WinnerCard;
