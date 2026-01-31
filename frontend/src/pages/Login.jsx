import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, #1e1b4b, #0f172a)' }}>
            <div className="card animate-fade" style={{ width: '400px', padding: '2.5rem' }}>
                <h2 className="text-2xl text-center" style={{ marginBottom: '2rem' }}>Welcome Back</h2>

                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="input-group">
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--text-muted)' }} />
                            <input
                                className="input"
                                style={{ width: '100%', paddingLeft: '2.5rem' }}
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
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
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary justify-center" style={{ marginTop: '1rem' }}>
                        Login
                    </button>

                    <div className="text-center text-sm text-muted" style={{ marginTop: '1rem' }}>
                        Don't have an account? <Link to="/register" className="text-primary">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
