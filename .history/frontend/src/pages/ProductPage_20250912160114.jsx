import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProduct, updateProduct } from '../services/products';
import { placeBid, deleteBid } from '../services/bids';
import BidForm from '../components/user/BidForm';
import ProductForm from '../components/admin/ProductForm';
import Modal from '../components/common/Modal';
import '../styles/product.css';

const ProductPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProduct(id);
                console.log(res.data.bids); // Check if user data is populated
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleBidSubmit = async (bidData) => {
        try {
            await placeBid(bidData);
            const res = await getProduct(id);
            setProduct(res.data);
        } catch (err) {
            console.error('Error placing bid:', err);
            throw err;
        }
    };

    const handleProductSubmit = async (productData) => {
        try {
            await updateProduct(id, productData);
            const res = await getProduct(id);
            setProduct(res.data);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    const handleDeleteBid = async (bidId) => {
        try {
            await deleteBid(bidId);
            const res = await getProduct(id);
            setProduct(res.data);
        } catch (err) {
            console.error('Error deleting bid:', err);
        }
    };

    const getHighestBid = () => {
        if (!product?.bids || product.bids.length === 0) {
            return 'None yet';
        }
        const highestBid = Math.max(...product.bids.map(bid => bid.amount));
        return highestBid;
    };

    const highestBid = getHighestBid();
    const isDeadlinePassed = product ? new Date(product.biddingDeadline) < new Date() : false;

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-main-container">
            <div className="product-details">
                <div className="product-image-container">
                    <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
                </div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price-label">Base Price: <span>${product.basePrice}</span></p>
                <p className="bid-label">Highest Bid: <span>{highestBid !== 'None yet' ? `$${highestBid}` : highestBid}</span></p>
                <p>Deadline: {new Date(product.biddingDeadline).toLocaleString()}</p>
                {user?.role === 'user' && !isDeadlinePassed && <BidForm product={product} onSubmit={handleBidSubmit} />}
                {!isDeadlinePassed && user?.role === 'admin' && (
                    <button className="edit-product-button" onClick={() => setIsModalOpen(true)}>Edit Product</button>
                )}
                {isDeadlinePassed && <p className="deadline-passed">The bidding deadline for this product has passed.</p>}
            </div>
            {user?.role === 'admin' && (
                <div className="bids-panel">
                    <h3>Manage Bids</h3>
                    {product.bids?.length === 0 ? (
                        <p>No bids yet.</p>
                    ) : (
                        <div className="bids-list">
                            {product.bids?.map(bid => (
                                <div key={bid._id} className="bid-item">
                                    <p>{bid.amount}</p>
                                    <p>User: {bid.user?.username || 'Unknown'}</p>
                                    <p>Amount: ${bid.amount}</p>
                                    <p>Time: {new Date(bid.timestamp).toLocaleString()}</p>
                                    {!isDeadlinePassed && (
                                        <button
                                            onClick={() => handleDeleteBid(bid._id)}
                                            className="delete-bid-button"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ProductForm product={product} onSubmit={handleProductSubmit} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default ProductPage;
