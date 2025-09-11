import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/productCard.css';

const ProductCard = ({ product }) => {
    const [timeRemaining, setTimeRemaining] = useState(null);

    const calculateTimeRemaining = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diff = deadlineDate - now;

        if (diff <= 0) {
            return "Bidding Closed";
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(product.biddingDeadline));
        }, 1000);

        return () => clearInterval(timer);
    }, [product.biddingDeadline]);

    const getHighestBid = () => {
        if (!product.bids || product.bids.length === 0) {
            return "None yet";
        }
        const highestBid = Math.max(...product.bids.map(bid => bid.amount));
        return highestBid;
    };

    const highestBid = getHighestBid();

    return (
        <div className="product-card-container">
            <div className="product-card">
                <div className="product-image-container">

                    <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />

                </div>
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price-container">
                        <p className="product-price">Base Price: <span>${product.basePrice}</span></p>
                        <p className="product-highest-bid">Highest Bid: <span>{highestBid !== 'None yet' ? `$${highestBid}` : highestBid}</span></p>
                    </div>
                    <div className="product-deadline-container">
                        <p className="product-deadline">Deadline: {new Date(product.biddingDeadline).toLocaleString()}</p>
                        <p className={timeRemaining === "Bidding Closed" ? "closed" : "open"}>
                            {timeRemaining === "Bidding Closed" ? timeRemaining : `Time Left: ${timeRemaining}`}
                        </p>
                    </div>
                    <Link to={`/products/${product._id}`} className="bid-button">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
