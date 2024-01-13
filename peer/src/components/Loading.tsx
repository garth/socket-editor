import { type FunctionComponent } from 'react'
import classNames from 'classnames'

export const Loading: FunctionComponent<{ className?: string }> = ({ className }) => {
  return (
    <svg className={classNames('animate-spin', className)} viewBox="0 0 32 32" fill="currentColor">
      <path
        className="opacity-25"
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
      />
      <path className="opacity-75" d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" />
    </svg>
  )
}
