import React, { useState } from 'react';
import '../../styles/productForm.css';

const ProductForm = ({ product, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        basePrice: product?.basePrice || '',
        biddingDeadline: product?.biddingDeadline
            ? new Date(product.biddingDeadline).toISOString().slice(0, 16)
            : '',
    });
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('basePrice', formData.basePrice);
        data.append('biddingDeadline', formData.biddingDeadline);
        if (image) {
            data.append('image', image);
        }
        onSubmit(data);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="form-modal" onClick={(e) => e.target.className === 'form-modal' && onClose()}>
            <div className="product-form-container">
                <form className="product-form" onSubmit={handleSubmit}>
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Base Price:</label>
                        <input
                            type="number"
                            placeholder="Base Price"
                            value={formData.basePrice}
                            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Bidding Deadline:</label>
                        <input
                            type="datetime-local"
                            value={formData.biddingDeadline}
                            onChange={(e) => setFormData({ ...formData, biddingDeadline: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
