import { Route, Routes } from 'react-router-dom'
import ExercisePage from './components/ExercisePage.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import TaskManagerPage from './pages/TaskManagerPage.tsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/exercises/task-manager"
        element={
          <ExercisePage number={1} total={1}>
            <TaskManagerPage />
          </ExercisePage>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
