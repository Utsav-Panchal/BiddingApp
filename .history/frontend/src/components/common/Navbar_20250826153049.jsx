import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">🏆 AuctionApp</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        {user.role === 'admin' ? (
                            <>
                                <Link to="/admin/dashboard">Dashboard</Link>
                                <Link to="/admin/products">Products</Link>
                                <Link to="/admin/bids">Bids</Link>
                                <Link to="/admin/register">Register Admin</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/">Home</Link>
                                <Link to="/winners">Winners</Link>
                                <Link to="/bids">My Bids</Link>
                            </>
                        )}
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
