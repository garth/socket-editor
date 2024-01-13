import { Link, Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'

export default function Root() {
  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-sky-400 py-3 text-center text-2xl font-bold">
        <Link to="/" className="text-white opacity-90">
          Socket Editor
        </Link>
      </div>

      <div className="flex flex-grow flex-col">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}
