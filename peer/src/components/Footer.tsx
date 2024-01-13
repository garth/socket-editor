import { type FunctionComponent } from 'react'

export const Footer: FunctionComponent = () => {
  return (
    <footer className="flex-grow-0 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-6">
        <p className="mt-4 text-center text-sm text-gray-400">Socket Editor demo by NordStack Ltd..</p>
      </div>
    </footer>
  )
}
