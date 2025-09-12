import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OpenProducts from './componenets/admin/OpenProducts';
import ClosedProducts from './components/admin/ClosedProducts';
import AddProduct from './AddProduct';
import '../../styles/adminProductPage.css';

const AdminProductPage = () => {
    const [view, setView] = useState('open'); // default view is open products

    return (
        <div className="admin-product-page">
            <div className="admin-product-header">
                <button className={view === 'open' ? 'active' : ''} onClick={() => setView('open')}>
                    Open Products
                </button>
                <button className={view === 'closed' ? 'active' : ''} onClick={() => setView('closed')}>
                    Closed Products
                </button>
                <button className={view === 'add' ? 'active' : ''} onClick={() => setView('add')}>
                    Add Product
                </button>
            </div>
            <div className="admin-product-content">
                {view === 'open' && <OpenProducts />}
                {view === 'closed' && <ClosedProducts />}
                {view === 'add' && <AddProduct />}
            </div>
        </div>
    );
};

export default AdminProductPage;
