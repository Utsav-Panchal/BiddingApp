// import React from 'react';
// import '../../styles/winnerCard.css';

// const WinnerCard = ({ winner }) => {
//     return (
//         <div className="winner-card">
//             <h3>{winner.product.name}</h3>
//             <p>Winner: {winner.winner.username}</p>
//             <p>Winning Bid: ${winner.winningBid}</p>
//         </div>
//     );
// };

// export default WinnerCard;


import React from 'react';
import '../../styles/winnerCard.css';

const WinnerCard = ({ product }) => {
    return (
        <div className="winner-card">
            <div className="winner-image-container">
                <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
            </div>
            <div className="winner-info">
                <h3>{product.name}</h3>
                console.log(product);
                <p>Base Price: ${product.basePrice}</p>
                <p>Winning Bid: ${product.highestBid}</p>
                <p className="congratulations-message">Congratulations! You won this product.</p>
            </div>
        </div>
    );
};

export default WinnerCard;
