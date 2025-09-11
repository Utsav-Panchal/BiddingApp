import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ ...decoded, token });
        }
    }, []);

    const loginUser = async (credentials) => {
        const res = await loginService(credentials);
        const decoded = jwtDecode(res.data.token);
        localStorage.setItem('token', res.data.token);
        setUser({ ...decoded, token: res.data.token });
    };

    const registerUser = async (userData) => {
        await registerService(userData);
        // const decoded = jwtDecode(res.data.token);
        // localStorage.setItem('token', res.data.token);
        // setUser({ ...decoded, token: res.data.token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const AuthenticatedRoutevar = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};