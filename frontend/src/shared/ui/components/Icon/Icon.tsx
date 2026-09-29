import type { ComponentProps } from 'react'

type IconProps = ComponentProps<'svg'> & { iconName: string }

export function Icon({ iconName, ...props }: IconProps) {
  return (
    <svg {...props}>
      <use href={`/assets/images/${iconName}.svg#${iconName}`} />
    </svg>
  )
}
