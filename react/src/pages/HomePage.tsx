import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-content">
        <h1>React practice</h1>
        <p>Small exercises for rebuilding React and TypeScript fundamentals.</p>

        <ol className="exercise-list">
          <li>
            <Link to="/exercises/task-manager">
              <span>Exercise 1</span>
              <strong>Task manager</strong>
              <span>
                Array rendering, search, filtering, sorting, updates, and
                statistics.
              </span>
            </Link>
          </li>
        </ol>
      </div>
    </main>
  )
}
