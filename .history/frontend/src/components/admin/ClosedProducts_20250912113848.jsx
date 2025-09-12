import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getClosedProducts } from '../../services/products';
import ProductCard from '../../components/common/ProductCard';
import '../../styles/closedProducts.css';

const ClosedProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getClosedProducts();
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching closed products:', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="closed-products">
            <h2>Closed Products</h2>
            <div className="products-grid">
                {products.map(product => (
                    <Link key={product._id} to={`/admin/products/${product._id}`} className="product-link">
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ClosedProducts;
