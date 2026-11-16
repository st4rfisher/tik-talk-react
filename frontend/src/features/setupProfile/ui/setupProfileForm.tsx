import clsx from 'clsx'
import { type ReactNode } from 'react'
import { Controller } from 'react-hook-form'

import { ChipsInput, Icon, Input } from '@uiKit'

import styles from './setupProfileForm.module.scss'
import { useSetupProfile } from '../model/useSetupProfile'

type SetupProfileFormProps = {
  onSuccessFn: () => void
  onSave?: () => Promise<void>
  hasPendingChanges?: boolean
  avatarComponent: ReactNode
}

export function SetupProfileForm({
  onSuccessFn,
  onSave,
  hasPendingChanges = false,
  avatarComponent,
}: SetupProfileFormProps) {
  const { register, control, submit, errors, isSubmitting, isDirty } = useSetupProfile(onSuccessFn, onSave)
  const isDisabledSubmit = isSubmitting || (!isDirty && !hasPendingChanges)

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles['form-top']}>
        <div className={styles['split-area']}>
          <Input 
            {...register('firstName')}
            type="text" 
            placeholder="Введите имя" 
            error={errors.firstName?.message}
            >
              Имя
          </Input>
          <Input 
            type="text" 
            placeholder="Введите фамилию" 
            error={errors.lastName?.message}
            {...register('lastName')}>
              Фамилия
          </Input>
        </div>

        <Input 
          type="text" 
          placeholder="-" 
          {...register('username')}
          error={errors.username?.message}
          disabled>
            Telegram Username
        </Input>

        <label className={clsx('label', styles.label)}>
          О себе
          <textarea
            className={clsx('input', 'input--border-bottom', styles.input)}
            placeholder="Введите данные"
            rows={4}
            {...register('description')}
          />
        </label>

        <div className={clsx('label', styles['label'])}>
          Аватар
          {avatarComponent}
        </div>

        <Controller
          name="stack"
          control={control}
          render={({ field, fieldState }) => (
            <label className={
              clsx('label', styles['label'])} 
              htmlFor={field.name}
            >
              Навыки (стэк)
              <ChipsInput
                id={field.name}
                name={field.name}
                ref={field.ref}
                value={field.value}
                disabled={field.disabled}
                error={fieldState.error?.message}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
            </label>
          )}
        />

        <Input
          type="text"
          {...register('city')}
          error={errors.city?.message}
        >
          Адрес
        </Input>
      </div>

      <div className={styles['form-bottom']}>
        <div className={styles['form-buttons']}>
          <button
            type="button"
            className={clsx('button', 'button--secondary', 'button--danger')}
            aria-label="Удалить"
          >
            <Icon iconName="trash" width="16" height="16" />
          </button>
          <button
            type="button"
            className={clsx('button', 'button--secondary')}
            aria-label="Выйти"
          >
            <Icon iconName="exit" width="16" height="16" />
          </button>
        </div>
        <div className={styles['form-buttons']}>
          <button 
            type="button" 
            className={clsx('button', 'button--secondary', 'button--danger')}
            disabled={isSubmitting}>
              Отмена
          </button>
          <button 
            type="submit" 
            className={clsx('button', 'button--primary')}
            disabled={isDisabledSubmit}>
              Сохранить
          </button>
        </div>
      </div>
    </form>
  )
}
