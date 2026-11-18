import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { exercises } from '../exercises/exerciseRegistry.ts'

type ExercisePageProps = {
  children: ReactNode
  exerciseIndex: number
}

export default function ExercisePage({
  children,
  exerciseIndex,
}: ExercisePageProps) {
  const previousExercise = exercises[exerciseIndex - 1]
  const nextExercise = exercises[exerciseIndex + 1]

  return (
    <div className="exercise-page">
      <header className="exercise-header">
        <Link to="/">← All exercises</Link>
        <span>
          Exercise {exerciseIndex + 1} of {exercises.length}
        </span>
      </header>

      {children}

      <nav className="exercise-pagination" aria-label="Exercise pagination">
        {previousExercise ? (
          <Link to={previousExercise.path}>← {previousExercise.title}</Link>
        ) : (
          <span aria-disabled="true">← Previous</span>
        )}

        <Link to="/">Home</Link>

        {nextExercise ? (
          <Link to={nextExercise.path}>{nextExercise.title} →</Link>
        ) : (
          <span aria-disabled="true">Next →</span>
        )}
      </nav>
    </div>
  )
}
