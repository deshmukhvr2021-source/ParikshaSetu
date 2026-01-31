import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Add token to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists on load
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const email = localStorage.getItem('email');
        if (token && email) {
            setUser({ email, role }); // In real app, validate token with backend
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token, role, name } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('email', email);
            localStorage.setItem('name', name);

            setUser({ email, role, name });
            return true;
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, api }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
