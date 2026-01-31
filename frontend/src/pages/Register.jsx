import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Key } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT'
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Try again.');
        }
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #1e1b4b, #0f172a)' }}>
            <div className="card animate-fade" style={{ width: '400px', padding: '2.5rem' }}>
                <h2 className="text-2xl text-center" style={{ marginBottom: '2rem' }}>Create Account</h2>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="input-group">
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input"
                                style={{ width: '100%', paddingLeft: '2.5rem' }}
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input"
                                type="email"
                                style={{ width: '100%', paddingLeft: '2.5rem' }}
                                placeholder="Email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input"
                                type="password"
                                style={{ width: '100%', paddingLeft: '2.5rem' }}
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <div style={{ position: 'relative' }}>
                            <Key size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <select
                                className="input"
                                style={{ width: '100%', paddingLeft: '2.5rem', appearance: 'none' }}
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="TEACHER">Teacher</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-primary justify-center" style={{ marginTop: '1rem' }}>
                        Register
                    </button>

                    <div className="text-center text-sm text-muted" style={{ marginTop: '1rem' }}>
                        Already have an account? <Link to="/login" className="text-primary">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
