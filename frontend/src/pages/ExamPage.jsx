import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Clock, Send } from 'lucide-react';

export default function ExamPage() {
    const { examId } = useParams(); // This is studentExamId
    const { api } = useAuth();
    const navigate = useNavigate();

    const [exam, setExam] = useState(null);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExam();
    }, []);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit(); // Auto-submit when time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const fetchExam = async () => {
        try {
            const res = await api.get(`/student/exam/${examId}`);
            setExam(res.data);
            setTimeLeft(res.data.durationMinutes * 60); // Convert to seconds
        } catch (error) {
            console.error(error);
            alert('Failed to load exam');
        } finally {
            setLoading(false);
        }
    };

    const selectAnswer = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };

    const handleSubmit = async () => {
        if (!window.confirm('Are you sure you want to submit?')) return;

        setLoading(true);
        try {
            const answersList = exam.questions.map(q => ({
                question: { id: q.id },
                selectedOption: answers[q.id] || null,
                subjectiveAnswer: null,
                marksAwarded: 0
            }));

            await api.post(`/student/submit-exam/${examId}`, answersList);
            alert('Exam submitted successfully!');
            navigate('/student');
        } catch (error) {
            console.error(error);
            alert('Failed to submit exam');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) return <div className="text-center">Loading exam...</div>;
    if (!exam) return <div className="text-center text-danger">Exam not found</div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <div className="card" style={{
                position: 'sticky',
                top: '1rem',
                zIndex: 10,
                borderLeft: '4px solid var(--primary)',
                marginBottom: '2rem'
            }}>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl">{exam.examTitle}</h1>
                        <p className="text-muted">Total Marks: {exam.totalMarks}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className="flex items-center gap-2" style={{
                            fontSize: '1.5rem',
                            color: timeLeft < 300 ? 'var(--danger)' : 'var(--primary)'
                        }}>
                            <Clock size={24} />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                        <p className="text-sm text-muted">
                            {Object.keys(answers).length} / {exam.questions.length} answered
                        </p>
                    </div>
                </div>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-6">
                {exam.questions.map((q, index) => (
                    <div key={q.id} className="card animate-fade">
                        <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <span className="text-muted">Question {index + 1}</span>
                                <h3 className="text-lg" style={{ marginTop: '0.5rem' }}>
                                    {q.questionText}
                                </h3>
                            </div>
                            <span className="text-primary text-sm">{q.marks} marks</span>
                        </div>

                        <div className="flex flex-col gap-3" style={{ marginTop: '1.5rem' }}>
                            {['A', 'B', 'C', 'D'].map(opt => {
                                const isSelected = answers[q.id] === opt;
                                return (
                                    <div
                                        key={opt}
                                        onClick={() => selectAnswer(q.id, opt)}
                                        style={{
                                            padding: '1rem',
                                            border: `2px solid ${isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
                                            borderRadius: '8px',
                                            background: isSelected ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                        className="hover:border-primary"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--text-muted)'}`,
                                                background: isSelected ? 'var(--primary)' : 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isSelected ? 'white' : 'var(--text-muted)',
                                                fontSize: '0.9rem'
                                            }}>
                                                {opt}
                                            </div>
                                            <span>{q[`option${opt}`]}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div style={{
                position: 'sticky',
                bottom: '2rem',
                marginTop: '3rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    disabled={loading}
                    style={{
                        fontSize: '1.1rem',
                        padding: '1rem 3rem',
                        boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)'
                    }}
                >
                    <Send size={20} /> {loading ? 'Submitting...' : 'Submit Exam'}
                </button>
            </div>
        </div>
    );
}
