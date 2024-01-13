import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import './index.css'

const root = document.getElementById('root')

if (root != null) {
  ReactDOM.createRoot(root).render(<RouterProvider router={router} />)
}
