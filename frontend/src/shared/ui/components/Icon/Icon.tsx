import type { ComponentProps } from 'react'

type IconProps = ComponentProps<'svg'> & { iconName: string }

export function Icon({ iconName, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`#${iconName}`} />
    </svg>
  )
}
