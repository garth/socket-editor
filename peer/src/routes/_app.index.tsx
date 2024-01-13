import { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Link } from 'react-router-dom'

export default function Presentations() {
  const [name, setName] = useState(window.localStorage.getItem('name') ?? 'Anonymous')
  const [documentKey, setDocumentKey] = useState('Free4All')

  useEffect(() => {
    window.localStorage.setItem('name', name)
  }, [name])

  return (
    <>
      <Header>Start</Header>
      <Main>
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
            Your Name
          </label>
          <div className="mt-2">
            <input
              type="name"
              id="name"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="documentKey" className="block text-sm font-medium leading-6 text-gray-900">
            Document Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="documentKey"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              value={documentKey}
              onChange={(e) => setDocumentKey(e.target.value)}
            />
          </div>
        </div>
        <Link
          to={`/document/${encodeURIComponent(documentKey)}`}
          className="mt-4 rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
          Edit
        </Link>
      </Main>
    </>
  )
}
