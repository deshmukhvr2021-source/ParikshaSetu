import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ExamPage from './pages/ExamPage';
import CreateExam from './pages/CreateExam';
import ExamResults from './pages/ExamResults';
import Layout from './components/Layout';

function PrivateRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />; // Redirect to home or unauthorized
  return children;
}

import Register from './pages/Register';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<Layout />}>
        {/* Redirect root based on role */}
        <Route path="/" element={
          user?.role === 'ADMIN' ? <Navigate to="/admin" /> :
            user?.role === 'TEACHER' ? <Navigate to="/teacher" /> :
              user?.role === 'STUDENT' ? <Navigate to="/student" /> :
                <Navigate to="/login" />
        } />

        <Route path="/admin" element={
          <PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>
        } />
        <Route path="/teacher" element={
          <PrivateRoute role="TEACHER"><TeacherDashboard /></PrivateRoute>
        } />
        <Route path="/teacher/create-exam" element={
          <PrivateRoute role="TEACHER"><CreateExam /></PrivateRoute>
        } />
        <Route path="/teacher/exam/:examId/results" element={
          <PrivateRoute role="TEACHER"><ExamResults /></PrivateRoute>
        } />
        <Route path="/student" element={
          <PrivateRoute role="STUDENT"><StudentDashboard /></PrivateRoute>
        } />
        <Route path="/exam/:examId" element={
          <PrivateRoute role="STUDENT"><ExamPage /></PrivateRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;
