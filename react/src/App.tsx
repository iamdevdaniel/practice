import { Route, Routes } from 'react-router-dom'
import ExercisePage from './components/ExercisePage.tsx'
import TaskManagerExercise from './exercises/TaskManagerExercise.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/exercises/task-manager"
        element={
          <ExercisePage exerciseIndex={0}>
            <TaskManagerExercise />
          </ExercisePage>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
