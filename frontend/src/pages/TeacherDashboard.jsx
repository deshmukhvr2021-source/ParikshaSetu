import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Eye, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
    const { api } = useAuth();
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const res = await api.get('/exams');
            setExams(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const publishExam = async (examId) => {
        if (!window.confirm('⚠️ WARNING: Once published, you CANNOT edit this exam. Are you sure you want to publish?')) {
            return;
        }

        try {
            await api.patch(`/exams/${examId}/publish`);
            fetchExams(); // Refresh list
            alert('Exam published successfully!');
        } catch (e) {
            alert('Failed to publish exam');
        }
    };

    const viewResults = (examId) => {
        navigate(`/teacher/exam/${examId}/results`);
    };

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <h1 className="text-2xl">My Exams</h1>
                <button onClick={() => navigate('/teacher/create-exam')} className="btn btn-primary">
                    <Plus size={18} /> Create Exam
                </button>
            </div>

            {exams.length === 0 ? (
                <div className="card text-center text-muted">
                    <p>No exams created yet. Click "Create Exam" to get started!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {exams.map(exam => (
                        <div key={exam.id} className="card hover:border-primary transition-all">
                            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                                <h3 className="text-xl">{exam.title}</h3>
                                <span
                                    className="text-xs"
                                    style={{
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        background: exam.status === 'PUBLISHED' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(250, 204, 21, 0.2)',
                                        color: exam.status === 'PUBLISHED' ? 'var(--success)' : 'var(--warning)'
                                    }}
                                >
                                    {exam.status || 'DRAFT'}
                                </span>
                            </div>

                            <div className="text-sm text-muted" style={{ marginBottom: '1.5rem' }}>
                                <p>⏱️ {exam.durationMinutes} minutes</p>
                                <p>📝 {exam.questions?.length || 0} questions</p>
                                <p>💯 {exam.totalMarks} marks</p>
                            </div>

                            <div className="flex gap-2">
                                {exam.status !== 'PUBLISHED' ? (
                                    <>
                                        <button
                                            onClick={() => navigate(`/teacher/edit-exam/${exam.id}`)}
                                            className="btn flex-1"
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            <Edit size={16} /> Edit
                                        </button>
                                        <button
                                            onClick={() => publishExam(exam.id)}
                                            className="btn btn-primary flex-1"
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            <CheckCircle size={16} /> Publish
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => viewResults(exam.id)}
                                        className="btn btn-primary"
                                        style={{ width: '100%', fontSize: '0.9rem' }}
                                    >
                                        <Eye size={16} /> View Results
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
