import React, { useState } from 'react';
import { addProduct } from '../../services/products';
import '../../styles/addProduct.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        basePrice: '',
        deadline: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('basePrice', product.basePrice);
        formData.append('biddingDeadline', product.deadline);
        formData.append('image', product.image);

        try {
            await addProduct(formData);
            alert('Product added successfully!');
            setProduct({
                name: '',
                description: '',
                basePrice: '',
                deadline: '',
                image: null,
            });
        } catch (err) {
            alert('Error adding product');
        }
    };

    return (
        <div className="add-product">
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={product.description} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Base Price:</label>
                    <input type="number" name="basePrice" value={product.basePrice} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Deadline:</label>
                    <input type="datetime-local" name="deadline" value={product.deadline} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleImageChange} required />
                </div>
                <button type="submit" className="submit-button">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
