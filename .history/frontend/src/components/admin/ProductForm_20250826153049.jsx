import React, { useState, useEffect } from 'react';
import '../../styles/productForm.css';

const ProductForm = ({ product, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        basePrice: product?.basePrice || '',
        biddingDeadline: product?.biddingDeadline
            ? new Date(product.biddingDeadline).toISOString().slice(0, 16)
            : '',
        image: product?.image || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
            />
            <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Base Price"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                required
            />
            <input
                type="datetime-local"
                value={formData.biddingDeadline}
                onChange={(e) => setFormData({ ...formData, biddingDeadline: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
    );
};

export default ProductForm;
