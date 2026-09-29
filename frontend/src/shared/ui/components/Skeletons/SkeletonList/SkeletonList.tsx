import clsx from 'clsx'
import type { ReactNode } from 'react'

import styles from './SkeletonList.module.scss'

type SkeletonListProps = {
  skeletonCount?: number
  className?: string | null
  children: ReactNode
}

export function SkeletonList({
  skeletonCount = 3,
  className,
  children,
}: SkeletonListProps) {
  return Array.from({ length: skeletonCount }, (_, index) => (
    <div key={index} className={
      clsx(
        styles['skeleton-list'], 
        className
      )}>
        {children}
    </div>
  ))
}
