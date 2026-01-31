import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';

export default function CreateExam() {
    const { api } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [exam, setExam] = useState({
        title: '',
        durationMinutes: 60,
        totalMarks: 0,
        questions: []
    });

    const addQuestion = () => {
        setExam({
            ...exam,
            questions: [
                ...exam.questions,
                {
                    questionText: '',
                    type: 'MCQ',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    correctAnswer: 'A',
                    marks: 1
                }
            ]
        });
    };

    const removeQuestion = (index) => {
        const newQuestions = exam.questions.filter((_, i) => i !== index);
        setExam({ ...exam, questions: newQuestions });
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...exam.questions];
        newQuestions[index][field] = value;
        setExam({ ...exam, questions: newQuestions });
    };

    const calculateTotalMarks = () => {
        return exam.questions.reduce((sum, q) => sum + parseInt(q.marks || 0), 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...exam,
                totalMarks: calculateTotalMarks(),
                status: 'CREATED' // Save as draft, teacher publishes later
            };

            await api.post('/exams', payload);
            navigate('/teacher');
        } catch (error) {
            console.error(error);
            alert('Failed to save exam');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate('/teacher')} className="btn" style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                <ArrowLeft size={18} /> Back to Dashboard
            </button>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Exam Title Card */}
                <div className="card" style={{ borderTop: '4px solid var(--primary)' }}>
                    <input
                        type="text"
                        placeholder="Exam Title"
                        className="input"
                        style={{ fontSize: '2rem', fontWeight: 'bold', border: 'none', background: 'transparent', padding: '0.5rem 0' }}
                        value={exam.title}
                        onChange={e => setExam({ ...exam, title: e.target.value })}
                        required
                    />
                    <div className="flex gap-4" style={{ marginTop: '1rem' }}>
                        <div className="input-group">
                            <label>Duration (Minutes)</label>
                            <input
                                type="number"
                                className="input"
                                value={exam.durationMinutes}
                                onChange={e => setExam({ ...exam, durationMinutes: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="input-group">
                            <label>Total Marks (Auto)</label>
                            <div className="input" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                {calculateTotalMarks()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Questions List */}
                {exam.questions.map((q, index) => (
                    <div key={index} className="card animate-fade">
                        <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                            <span className="text-muted">Question {index + 1}</span>
                            <button type="button" onClick={() => removeQuestion(index)} className="text-danger hover:text-danger-light">
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            <textarea
                                placeholder="Question Text"
                                className="input"
                                style={{ minHeight: '80px', fontSize: '1.1rem' }}
                                value={q.questionText}
                                onChange={e => updateQuestion(index, 'questionText', e.target.value)}
                                required
                            />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {['A', 'B', 'C', 'D'].map(opt => (
                                    <div key={opt} className="flex items-center gap-2">
                                        <div style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            border: `2px solid ${q.correctAnswer === opt ? 'var(--success)' : 'var(--text-muted)'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer'
                                        }}
                                            onClick={() => updateQuestion(index, 'correctAnswer', opt)}
                                        >
                                            {opt}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={`Option ${opt}`}
                                            className="input"
                                            style={{ flex: 1 }}
                                            value={q[`option${opt}`]}
                                            onChange={e => updateQuestion(index, `option${opt}`, e.target.value)}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 border-t pt-4 border-white/5">
                                <div className="flex-1">
                                    <label className="text-sm text-muted">Correct Answer</label>
                                    <select
                                        className="input"
                                        value={q.correctAnswer}
                                        onChange={e => updateQuestion(index, 'correctAnswer', e.target.value)}
                                    >
                                        <option value="A">Option A</option>
                                        <option value="B">Option B</option>
                                        <option value="C">Option C</option>
                                        <option value="D">Option D</option>
                                    </select>
                                </div>
                                <div style={{ width: '100px' }}>
                                    <label className="text-sm text-muted">Marks</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={q.marks}
                                        onChange={e => updateQuestion(index, 'marks', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addQuestion}
                    className="btn"
                    style={{ border: '2px dashed var(--text-muted)', justifyContent: 'center', color: 'var(--text-muted)' }}
                >
                    <Plus size={20} /> Add Question
                </button>

                <div style={{ position: 'sticky', bottom: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ boxShadow: '0 4px 20px rgba(79, 70, 229, 0.4)' }}>
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Exam'}
                    </button>
                </div>
            </form>
        </div>
    );
}
