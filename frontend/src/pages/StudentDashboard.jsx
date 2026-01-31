import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Play, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
    const { api, user } = useAuth();
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            // Fetch only published exams
            const res = await api.get('/exams/published');
            setExams(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const startExam = async (examId) => {
        try {
            const res = await api.post(`/student/start-exam/${examId}?email=${user.email}`);
            navigate(`/exam/${res.data.id}`);
        } catch (e) {
            console.error(e);
            alert('Failed to start exam. You may have already started this exam.');
        }
    };

    return (
        <div>
            <h1 className="text-2xl" style={{ marginBottom: '2rem' }}>Available Exams</h1>

            {exams.length === 0 ? (
                <div className="card text-center text-muted">
                    <FileText size={48} style={{ margin: '0 auto 1rem' }} />
                    <p>No exams available yet. Check back later!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {exams.map(exam => (
                        <div key={exam.id} className="card hover:border-primary transition-all">
                            <div style={{ marginBottom: '1rem' }}>
                                <h3 className="text-xl" style={{ marginBottom: '0.5rem' }}>{exam.title}</h3>
                                <span className="text-xs text-success" style={{
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    background: 'rgba(34, 197, 94, 0.2)'
                                }}>
                                    PUBLISHED
                                </span>
                            </div>

                            <div className="text-sm text-muted" style={{ marginBottom: '1.5rem' }}>
                                <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
                                    <Clock size={16} />
                                    <span>{exam.durationMinutes} minutes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText size={16} />
                                    <span>{exam.questions?.length || 0} questions • {exam.totalMarks} marks</span>
                                </div>
                            </div>

                            <button
                                onClick={() => startExam(exam.id)}
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <Play size={16} /> Start Exam
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
