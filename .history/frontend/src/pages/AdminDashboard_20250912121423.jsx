// import React, { useEffect, useState } from 'react';
// import { getBids } from '../services/bids';
// import { getOpenProducts } from '../services/products';
// // import BidCard from '../components/common/BidCard';
// import ProductCard from '../components/common/ProductCard';
// import '../styles/adminDashboard.css';

// const AdminDashboard = () => {
//     const [bids, setBids] = useState([]);
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         getBids().then((res) => setBids(res.data));
//         getOpenProducts().then((res) => setProducts(res.data));
//     }, []);

//     return (
//         <div className="admin-dashboard">
//             <div className="dashboard-section">
//                 <h2>Open Products</h2>
//                 {products.slice(0, 5).map(product => <ProductCard key={product._id} product={product} />)}
//             </div>
//         </div>
//     );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOpenProducts, getClosedProducts, addProduct } from '../services/products';
import ProductCard from '../components/common/ProductCard';
import '../styles/adminDashboard.css';

const AdminDashboard = () => {
    const [openProducts, setOpenProducts] = useState([]);
    const [closedProducts, setClosedProducts] = useState([]);
    const [showAddProductPopup, setShowAddProductPopup] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        basePrice: '',
        biddingDeadline: '',
        image: null
    });

    useEffect(() => {
        const fetchOpenProducts = async () => {
            try {
                const res = await getOpenProducts();
                setOpenProducts(res.data);
            } catch (err) {
                console.error('Error fetching open products:', err);
            }
        };

        const fetchClosedProducts = async () => {
            try {
                const res = await getClosedProducts();
                setClosedProducts(res.data);
            } catch (err) {
                console.error('Error fetching closed products:', err);
            }
        };

        fetchOpenProducts();
        fetchClosedProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setNewProduct(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('description', newProduct.description);
        formData.append('basePrice', newProduct.basePrice);
        formData.append('biddingDeadline', newProduct.biddingDeadline);
        if (newProduct.image) {
            formData.append('image', newProduct.image);
        }

        try {
            await addProduct(formData);
            setShowAddProductPopup(false);
            setNewProduct({
                name: '',
                description: '',
                basePrice: '',
                biddingDeadline: '',
                image: null
            });
            const resOpen = await getOpenProducts();
            setOpenProducts(resOpen.data);
        } catch (err) {
            console.error('Error adding product:', err);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <button className="add-product-button" onClick={() => setShowAddProductPopup(true)}>
                    Add Product
                </button>
            </div>

            {showAddProductPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Add New Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Product Name:</label>
                                <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea name="description" value={newProduct.description} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Base Price:</label>
                                <input type="number" name="basePrice" value={newProduct.basePrice} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Bidding Deadline:</label>
                                <input type="datetime-local" name="biddingDeadline" value={newProduct.biddingDeadline} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Image:</label>
                                <input type="file" onChange={handleImageChange} />
                            </div>
                            <div className="form-actions">
                                <button type="submit">Add Product</button>
                                <button type="button" onClick={() => setShowAddProductPopup(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="dashboard-section">
                <h2>Open Products</h2>
                <div className="products-grid">
                    {openProducts.map(product => (
                        <Link key={product._id} to={`/products/${product._id}`} className="product-link">
                            <ProductCard product={product} />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="dashboard-section">
                <h2>Closed Products</h2>
                <div className="products-grid">
                    {closedProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
