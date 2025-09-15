import React, { useState } from 'react';
import './adminRegistrationForm.css';

const AdminRegistrationForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form className="admin-registration-form" onSubmit={handleSubmit}>
            <h2>Register New Admin</h2>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default AdminRegistrationForm;
