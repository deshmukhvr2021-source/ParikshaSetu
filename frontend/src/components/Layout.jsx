import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen } from 'lucide-react';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="layout">
            {/* Navbar */}
            <nav style={{
                background: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                padding: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div className="container flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <BookOpen className="text-primary" />
                        <span className="text-xl">ExamSystem</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted">
                            <User size={16} />
                            <span>{user?.name || user?.email}</span>
                            <span style={{
                                background: 'rgba(79, 70, 229, 0.2)',
                                color: 'var(--primary)',
                                padding: '2px 8px',
                                borderRadius: '99px',
                                fontSize: '0.75rem'
                            }}>
                                {user?.role}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.5rem' }}>
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container" style={{ padding: '2rem 1rem' }}>
                <Outlet />
            </main>
        </div>
    );
}
