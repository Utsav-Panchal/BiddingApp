import React from 'react';
import '../../styles/winnerCard.css';

const WinnerCard = ({ product }) => {
    console.log(product);
    return (
        <div className="winner-card">
            <div className="winner-image-container">
                <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
            </div>
            <div className="winner-info">
                <h3>{product.name}</h3>

                <p>Base Price: ${product.basePrice}</p>
                <p>Winning Bid: ${product.highestBid}</p>
                <p className="congratulations-message">Congratulations! You won this product.</p>
            </div>
        </div>
    );
};

export default WinnerCard;
