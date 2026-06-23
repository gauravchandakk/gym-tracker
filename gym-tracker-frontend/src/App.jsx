import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import WorkoutListPage from './pages/WorkoutListPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import ExerciseLibraryPage from './pages/ExerciseLibraryPage';
import NewWorkoutPage from './pages/NewWorkoutPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button type="button" className="mobile-menu-button" aria-label="Open navigation menu" onClick={() => setSidebarOpen(true)}>
        ☰
      </button>
      <button
        type="button"
        className={`sidebar-backdrop ${sidebarOpen ? 'show' : ''}`}
        aria-label="Close navigation menu"
        onClick={() => setSidebarOpen(false)}
      />

      <main className="app-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/workouts" element={<WorkoutListPage />} />
          <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
          <Route path="/exercises" element={<ExerciseLibraryPage />} />
          <Route path="/workout/new" element={<NewWorkoutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;