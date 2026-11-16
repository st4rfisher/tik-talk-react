import clsx from 'clsx'
import { useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'

import { Icon } from '@uiKit'

import styles from './AvatarUpload.module.scss'

type AvatarUploadProps = {
  previewUrl: string
  onProcessFile: (file: File | null | undefined) => void
}

export function AvatarUpload({ previewUrl, onProcessFile }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  function openFileDialog() {
    inputRef.current?.click()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter') return

    event.preventDefault()
    openFileDialog()
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onProcessFile(event.target.files?.item(0))
    event.target.value = ''
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragOver(true)
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()

    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return

    setIsDragOver(false)
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragOver(false)
    onProcessFile(event.dataTransfer.files.item(0))
  }

  return (
    <div className={styles['avatar-upload']}>
      <img className={styles['avatar']} src={previewUrl} width={120} height={120} alt="Аватар" />
      <div
        className={clsx(styles['dropzone'], isDragOver && styles['fileover'])}
        tabIndex={0}
        role="button"
        onClick={openFileDialog}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles['dropzone-content']}>
          <Icon className={styles['icon']} iconName="upload" width="18" height="18" />
          <span className="medium-text">
            Перетащите изображение или Загрузите (разрешение до 5,000 x 5,000 px)
          </span>
        </div>
        <input
          ref={inputRef}
          className={styles['avatar-input']}
          type="file"
          accept="image/*"
          onClick={(event) => event.stopPropagation()}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
