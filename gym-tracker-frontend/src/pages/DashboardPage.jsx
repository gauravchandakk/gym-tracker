import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import WorkoutCard from '../components/WorkoutCard';
import { getAllWorkouts, getStats } from '../services/exerciseService';
import { calculateCurrentStreak, countWorkoutExercises, countWorkoutSets, formatDate, formatNumber, getWorkoutTitle, normalizeCollection, sumWorkoutVolume } from '../utils/helpers';

function DashboardPage() {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError('');

      try {
        const [workoutsResponse, statsResponse] = await Promise.allSettled([getAllWorkouts(), getStats()]);

        if (workoutsResponse.status === 'fulfilled') {
          setWorkouts(normalizeCollection(workoutsResponse.value?.data));
        }

        if (statsResponse.status === 'fulfilled') {
          setStats(statsResponse.value?.data || null);
        }
      } catch (requestError) {
        setError(requestError?.response?.data?.message || requestError.message || 'Unable to load dashboard.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const recentWorkouts = useMemo(
    () => [...workouts].sort((left, right) => new Date(right?.date || right?.createdAt || 0) - new Date(left?.date || left?.createdAt || 0)).slice(0, 5),
    [workouts],
  );

  const totals = {
    totalWorkouts: stats?.totalWorkouts ?? workouts.length,
    totalSets: stats?.totalSets ?? workouts.reduce((total, workout) => total + countWorkoutSets(workout), 0),
    totalVolume: stats?.totalVolume ?? workouts.reduce((total, workout) => total + sumWorkoutVolume(workout), 0),
    currentStreak: stats?.currentStreak ?? calculateCurrentStreak(workouts),
  };

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-copy">
          <h2>Good Morning 💪</h2>
          <p>Build momentum with a clean overview of your training volume, streak, and the last sessions you logged.</p>
        </div>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => navigate('/workout/new')}>Log Workout</button>
          <button type="button" className="btn btn-outline" onClick={() => navigate('/workouts')}>View Workouts</button>
        </div>
      </section>

      {error ? <div className="error-state">{error}</div> : null}
      {loading ? <div className="loading-state"><div className="spinner" aria-label="Loading dashboard" /></div> : null}

      <section className="stat-grid" aria-label="Training stats">
        <StatCard label="Total Workouts" value={formatNumber(totals.totalWorkouts)} icon="📊" hint="All recorded sessions" />
        <StatCard label="Total Sets" value={formatNumber(totals.totalSets)} icon="🏋️" hint="Work completed across every lift" />
        <StatCard label="Total Volume kg" value={formatNumber(totals.totalVolume)} icon="⚡" hint="Load moved in the gym" />
        <StatCard label="Current Streak 🔥" value={formatNumber(totals.currentStreak)} icon="🔥" hint="Consecutive active days" />
      </section>

      <section>
        <div className="section-heading">
          <div>
            <h3>Recent Workouts</h3>
            <p>Last 5 sessions</p>
          </div>
        </div>

        <div className="workout-grid list">
          {!loading && recentWorkouts.length === 0 ? <div className="empty-state" style={{ gridColumn: '1 / -1' }}>No workouts yet. Start by logging your first session.</div> : null}
          {recentWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id ?? workout._id ?? `${getWorkoutTitle(workout)}-${formatDate(workout?.date || workout?.createdAt)}`}
              workout={workout}
              compact
              onOpen={() => navigate(`/workouts/${workout.id ?? workout._id}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
