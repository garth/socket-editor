import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './routes/ErrorPage.tsx'
import _app from './routes/_app.tsx'
import _app_index from './routes/_app.index.tsx'
import _app_document_documentName from './routes/_app.document.$documentName.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <_app />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <_app_index />,
      },
      {
        path: 'document/:documentName',
        element: <_app_document_documentName />,
      },
    ],
  },
])
