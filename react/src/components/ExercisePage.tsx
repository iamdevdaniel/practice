import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ExercisePageProps = {
  children: ReactNode
  number: number
  total: number
  previous?: string
  next?: string
}

export default function ExercisePage({
  children,
  number,
  total,
  previous,
  next,
}: ExercisePageProps) {
  return (
    <div className="exercise-page">
      <header className="exercise-header">
        <Link to="/">← All exercises</Link>
        <span>
          Exercise {number} of {total}
        </span>
      </header>

      {children}

      <nav className="exercise-pagination" aria-label="Exercise pagination">
        {previous ? (
          <Link to={previous}>← Previous</Link>
        ) : (
          <span aria-disabled="true">← Previous</span>
        )}

        <Link to="/">Home</Link>

        {next ? (
          <Link to={next}>Next →</Link>
        ) : (
          <span aria-disabled="true">Next →</span>
        )}
      </nav>
    </div>
  )
}
