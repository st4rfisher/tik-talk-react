import clsx from 'clsx'

import styles from './Skeleton.module.scss'

type SkeletonProps = {
  variant?: 'rectangle' | 'circle'
  width?: string
  height?: string
  className?: string
}

export function Skeleton({
  variant = 'rectangle',
  width = '100%',
  height = '1rem',
  className,
}: SkeletonProps) {
  return (
    <span
      className={clsx(
        styles['skeleton'],
        variant === 'circle' && styles['skeleton--circle'],
        variant === 'rectangle' && styles['skeleton--rectangle'],
        className,
      )}
      style={{ width, height }}
      aria-hidden
    />
  )
}
