import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOpenProducts } from '../../services/products';
import ProductCard from '../../components/common/ProductCard';
import '../../styles/openProducts.css';

const OpenProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getOpenProducts();
                setProducts(res.data);
            } catch (err) {
                console.error('Error fetching open products:', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="open-products">
            <h2>Open Products</h2>
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

export default OpenProducts;
