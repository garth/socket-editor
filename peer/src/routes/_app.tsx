import { Link, Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'

export default function Root() {
  return (
    <div className="app-container flex min-h-full flex-col">
      <div className="flex-grow-0 bg-sky-400 py-3 text-center text-2xl font-bold">
        <Link to="/" className="text-white opacity-90">
          Socket Editor
        </Link>
      </div>
      <div className="flex flex-grow flex-col bg-slate-50">
        <div className="flex-grow">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  )
}
