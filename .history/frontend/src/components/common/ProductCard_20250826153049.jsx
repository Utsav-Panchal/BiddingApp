import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/productCard.css';

const ProductCard = ({ product }) => {

    const getHighestBid = () => {
        if (!product.bids || product.bids.length === 0) {
            return 'None yet';
        }
        const highestBid = Math.max(...product.bids.map(bid => bid.amount));
        return highestBid;
    };

    const highestBid = getHighestBid();


    return (
        <div className="product-card">
            <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Base Price: ${product.basePrice}</p>
            <p>Highest Bid: {highestBid !== 'None yet' ? `$${highestBid}` : highestBid}</p>
            <Link to={`/products/${product._id}`} className="bid-button">View Details</Link>
        </div>
    );
};

export default ProductCard;
