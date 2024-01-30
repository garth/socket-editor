import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import process from 'socket:process'
import { router } from './router.tsx'
import './index.css'

document.body.setAttribute('platform', process.platform)

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
