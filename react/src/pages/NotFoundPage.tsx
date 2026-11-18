import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div>
        <h1>Page not found</h1>
        <Link to="/">Return to the exercise list</Link>
      </div>
    </main>
  )
}
