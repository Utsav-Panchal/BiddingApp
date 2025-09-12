// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { getProduct } from '../services/products';
// import { placeBid } from '../services/bids';
// import BidForm from '../components/user/BidForm';
// import ProductForm from '../components/admin/ProductForm';
// import BidManagement from '../components/admin/BidManagement';
// import Modal from '../components/common/Modal';
// import '../styles/product.css';

// const ProductPage = () => {
//     const { id } = useParams();
//     const { user } = useContext(AuthContext);
//     const [product, setProduct] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const res = await getProduct(id);

//                 console.log(res.data);
//                 console.log("going to set");
//                 setProduct(res.data);

//             } catch (err) {
//                 console.error('Error fetching product:', err);
//             }
//         };
//         fetchProduct();
//     }, [id]);

//     const handleBidSubmit = async (bidData) => {
//         try {
//             await placeBid(bidData);
//             const res = await getProduct(id);
//             setProduct(res.data);
//         } catch (err) {
//             console.error('Error placing bid:', err);
//             throw err; // This will trigger the error handling in BidForm
//         }
//     };

//     const handleProductSubmit = async (productData) => {
//         // Handle product update logic
//         setIsModalOpen(false);
//     };

//     const getHighestBid = () => {
//         if (!product?.bids || product.bids.length === 0) {
//             return 'None yet';
//         }
//         const highestBid = Math.max(...product.bids.map(bid => bid.amount));
//         return highestBid;
//     };

//     const highestBid = getHighestBid();

//     if (!product) return <div>Loading...</div>;

//     return (
//         <div className="product-page">
//             <div className="product-details">
//                 <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
//                 <h2>{product.name}</h2>
//                 <p>{product.description}</p>
//                 <p>Base Price: ${product.basePrice}</p>
//                 <p>Highest Bid: {highestBid !== 'None yet' ? `$${highestBid}` : highestBid}</p>
//                 {user?.role === 'user' && <BidForm product={product} onSubmit={handleBidSubmit} />}
//                 {user?.role === 'admin' && (
//                     <button onClick={() => setIsModalOpen(true)}>Edit Product</button>
//                 )}
//             </div>
//             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//                 <ProductForm product={product} onSubmit={handleProductSubmit} onClose={() => setIsModalOpen(false)} />
//             </Modal>
//             {user?.role === 'admin' && (
//                 <div className="bid-management-section">
//                     <h3>Manage Bids</h3>
//                     {product.bids?.map(bid => (
//                         <BidManagement
//                             key={bid._id}
//                             bid={bid}
//                             onUpdate={(bidId, data) => { } /* Handle bid update */}
//                             onDelete={(bidId) => { } /* Handle bid delete */}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductPage;



import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getProduct } from '../services/products';
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
        // Handle product update logic
        setIsModalOpen(false);
        const res = await getProduct(id);
        setProduct(res.data);
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
        <div className="product-page">
            <div className="product-container">
                <div className="product-details">
                    <div className="product-image-container">
                        <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
                    </div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Base Price: ${product.basePrice}</p>
                    <p>Highest Bid: {highestBid !== 'None yet' ? `$${highestBid}` : highestBid}</p>
                    <p>Deadline: {new Date(product.biddingDeadline).toLocaleString()}</p>
                    {user?.role === 'user' && !isDeadlinePassed && <BidForm product={product} onSubmit={handleBidSubmit} />}
                    {!isDeadlinePassed && user?.role === 'admin' && (
                        <button className="edit-product-button" onClick={() => setIsModalOpen(true)}>Edit Product</button>
                    )}
                    {isDeadlinePassed && <p className="deadline-passed">The bidding deadline for this product has passed.</p>}
                </div>
                {user?.role === 'admin' && (
                    <div className="bid-management-section">
                        <h3>Manage Bids</h3>
                        {product.bids?.length === 0 ? (
                            <p>No bids yet.</p>
                        ) : (
                            <div className="bids-list">
                                {product.bids?.map(bid => (
                                    <div key={bid._id} className="bid-item">
                                        <p>User: {bid.user?.username || 'Unknown'}</p>
                                        <p>Amount: ${bid.amount}</p>
                                        {!isDeadlinePassed && (
                                            <button
                                                onClick={() => handleDeleteBid(bid._id)}
                                                className="delete-bid-button"
                                            >
                                                Delete Bid
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ProductForm product={product} onSubmit={handleProductSubmit} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default ProductPage;
