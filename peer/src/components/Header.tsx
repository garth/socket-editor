import { type FunctionComponent, type ReactNode } from 'react'

export const Header: FunctionComponent<{ children?: ReactNode }> = ({ children }) => {
  return (
    <header className="flex-shrink-0 flex-grow-0 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">{children}</h1>
      </div>
    </header>
  )
}
