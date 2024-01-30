import classNames from 'classnames'
import { type FunctionComponent, type ReactNode } from 'react'

export const Main: FunctionComponent<{ className?: string; children?: ReactNode }> = ({ className, children }) => {
  return (
    <main className={classNames('flex flex-shrink-0 flex-grow flex-col', className)}>
      <div className="flex w-full max-w-7xl flex-grow flex-col px-4 py-6 sm:mx-auto sm:px-6 lg:px-8">{children}</div>
    </main>
  )
}
