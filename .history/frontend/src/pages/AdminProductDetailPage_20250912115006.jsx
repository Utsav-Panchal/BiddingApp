import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/products';
// import BidManagement from './BidManagement';
import BidManagement from '../components/admin/BidManagement';
import '../styles/adminProductDetailPage.css';

const AdminProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        basePrice: '',
        deadline: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProduct(id);
                setProduct(res.data);
                setEditProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, editProduct);
            setProduct(editProduct);
            setIsEditing(false);
            alert('Product updated successfully!');
        } catch (err) {
            console.error('Error updating product:', err);
            alert('Error updating product');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-product-detail">
            <div className="product-image-container">
                <img src={product.image || 'https://www.gstatic.com/webp/gallery/1.jpg'} alt={product.name} />
            </div>
            <div className="product-info">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="edit-product-form">
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={editProduct.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea name="description" value={editProduct.description} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Base Price:</label>
                            <input type="number" name="basePrice" value={editProduct.basePrice} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Deadline:</label>
                            <input type="datetime-local" name="deadline" value={editProduct.deadline} onChange={handleChange} />
                        </div>
                        <div className="form-buttons">
                            <button type="submit" className="save-button">Save</button>
                            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Base Price: ${product.basePrice}</p>
                        <p>Highest Bid: ${product.highestBid || 'No bids yet'}</p>
                        <p>Deadline: {new Date(product.biddingDeadline).toLocaleString()}</p>
                        <button onClick={handleEdit} className="edit-button">Edit Product</button>
                    </>
                )}
            </div>
            <BidManagement productId={id} />
        </div>
    );
};

export default AdminProductDetailPage;
