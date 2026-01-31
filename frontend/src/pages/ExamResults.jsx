import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Clock, CheckCircle } from 'lucide-react';

export default function ExamResults() {
    const { examId } = useParams();
    const { api } = useAuth();
    const navigate = useNavigate();
    const [exam, setExam] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const examRes = await api.get(`/exams/${examId}`);
            setExam(examRes.data);

            const resultsRes = await api.get(`/exams/${examId}/results`);
            setResults(resultsRes.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center">Loading results...</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button onClick={() => navigate('/teacher')} className="btn" style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            {exam && (
                <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
                    <h1 className="text-2xl" style={{ marginBottom: '0.5rem' }}>{exam.title}</h1>
                    <div className="flex gap-6 text-sm text-muted">
                        <span>Duration: {exam.durationMinutes} mins</span>
                        <span>Questions: {exam.questions?.length || 0}</span>
                        <span>Total Marks: {exam.totalMarks}</span>
                    </div>
                </div>
            )}

            <h2 className="text-xl" style={{ marginBottom: '1.5rem' }}>Student Results</h2>

            {results.length === 0 ? (
                <div className="card text-center text-muted">
                    <p>No students have attempted this exam yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {results.map((result, index) => (
                        <div key={index} className="card">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg">{result.studentName}</h3>
                                        <p className="text-sm text-muted">{result.studentEmail}</p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                    <div className="text-2xl text-primary" style={{ fontWeight: 'bold' }}>
                                        {result.score} / {exam?.totalMarks || 0}
                                    </div>
                                    <div className="text-sm text-muted flex items-center gap-1 justify-end">
                                        <Clock size={14} />
                                        <span>{result.timeTaken || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
