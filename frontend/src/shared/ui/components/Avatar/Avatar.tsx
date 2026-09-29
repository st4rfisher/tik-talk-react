import clsx from 'clsx'
import type { ComponentProps } from 'react'

import { imageUrl } from '@/shared/utils'
import styles from './Avatar.module.scss'

type AvatarProps = Omit<ComponentProps<'img'>, 'src' | 'width' | 'height'> & {
  url?: string | null
  size?: number
}

export function Avatar({ 
  url = null, 
  size = 32, 
  className, 
  alt = '', 
  ...props 
}: AvatarProps) {
  return (
    <img
      {...props}
      className={
        clsx(
          styles['avatar'], 
          className
        )
      }
      src={imageUrl(url)}
      alt={alt}
      width={size}
      height={size}
    />
  )
}
