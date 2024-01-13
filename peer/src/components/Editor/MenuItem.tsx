import { type ComponentProps, type FunctionComponent, type MouseEventHandler } from 'react'
import classNames from 'classnames'

export const MenuItem: FunctionComponent<{
  title: string
  icon: FunctionComponent<ComponentProps<'svg'>>
  action: MouseEventHandler<HTMLButtonElement>
  isActive?: () => boolean
}> = ({ title, icon: Icon, action, isActive }) => {
  const active = isActive && isActive()
  return (
    <button className={classNames(active ? 'text-blue-600' : 'text-gray-500')} onClick={action} title={title}>
      <Icon className="m-1 h-5 w-auto" />
    </button>
  )
}
