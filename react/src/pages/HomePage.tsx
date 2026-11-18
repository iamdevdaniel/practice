import { Link } from 'react-router-dom'
import { exercises } from '../exercises/exerciseRegistry.ts'

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="home-content">
        <h1>React practice</h1>
        <p>Small exercises for rebuilding React and TypeScript fundamentals.</p>

        <ol className="exercise-list">
          {exercises.map((exercise, index) => (
            <li key={exercise.path}>
              <Link to={exercise.path}>
                <span>Exercise {index + 1}</span>
                <strong>{exercise.title}</strong>
                <span>{exercise.description}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
