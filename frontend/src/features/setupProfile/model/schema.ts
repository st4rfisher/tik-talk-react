import type { Profile } from '@/entities/profile'
import { z } from 'zod'

//схема для формы setupProfileForm
export const setupProfileSchema = z.object({
  firstName: z.string().min(1, 'Введите имя'),
  lastName: z.string().min(1, 'Введите фамилию'),
  username: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  city: z.string(),
})

export type setupProfileFormValues = z.infer<typeof setupProfileSchema>

//Установка значений по умолчанию
export function setupProfileDefaultValues(): setupProfileFormValues {
  return {
    firstName: '',
    lastName: '',
    username: '',
    description: '',
    stack: [],
    city: '',
  }
}

//Преобразование данных профиля в значения формы
export function setupProfileFormValues(Profiledata: Profile): setupProfileFormValues {
  return {
    firstName: Profiledata.firstName,
    lastName: Profiledata.lastName,
    username: Profiledata.username,
    description: Profiledata.description,
    stack: Profiledata.stack,
    city: Profiledata.city,
  }
}


