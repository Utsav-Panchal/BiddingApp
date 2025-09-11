import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthenticatedRoutevar } from '../context/AuthContext';
// import { AuthenticatedRoutevar } from '../context/AuthenticatedRoute';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import ProductPage from '../pages/ProductPage';
import BidsPage from '../pages/BidsPage';
import WinnersPage from '../pages/WinnersPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashboard from '../pages/AdminDashboard';

const RoutesComponent = () => {
    return (
        <AuthProvider>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar />
                    <div className="main-content"></div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products/:id" element={<ProductPage />} />
                        <Route path="/bids" element={<AuthenticatedRoutevar><BidsPage /></AuthenticatedRoutevar>} />
                        <Route path="/winners" element={<WinnersPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>

                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default RoutesComponent;
