import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { path: 'activities', label: 'Activities' },
  { path: 'leaderboard', label: 'Leaderboard' },
  { path: 'teams', label: 'Teams' },
  { path: 'users', label: 'Users' },
  { path: 'workouts', label: 'Workouts' },
]

function Home() {
  return (
    <section className="text-center py-5">
      <h2>Welcome to OctoFit Tracker</h2>
      <p className="text-secondary">
        Track your activities, find your team, and celebrate your progress.
      </p>
    </section>
  )
}

function App() {
  return (
    <div className="container py-4">
      <header className="d-flex align-items-center gap-3 mb-4">
        <img
          src="/octofitapp-small.png"
          alt=""
          width="56"
          height="56"
          className="rounded"
        />
        <div>
          <h1 className="h3 mb-0">OctoFit Tracker</h1>
          <p className="text-secondary mb-0">Move together. Get stronger.</p>
        </div>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="Main navigation">
        <NavLink className="nav-link" end to="/">
          Home
        </NavLink>
        {sections.map(({ path, label }) => (
          <NavLink className="nav-link" key={path} to={`/${path}`}>
            {label}
          </NavLink>
        ))}
      </nav>

      <main>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route
            element={
              <section className="alert alert-warning" role="alert">
                That page was not found. Choose a section from the navigation.
              </section>
            }
            path="*"
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
