import classNames from 'classnames'
import { type FunctionComponent, type ReactNode } from 'react'

export const Panel: FunctionComponent<{ className?: string; children?: ReactNode }> = ({ className, children }) => {
  return (
    <div
      className={classNames(
        'flex flex-shrink-0 flex-grow flex-col overflow-hidden bg-white shadow sm:rounded-lg',
        className,
      )}>
      <div className="flex flex-shrink-0 flex-grow flex-col px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
