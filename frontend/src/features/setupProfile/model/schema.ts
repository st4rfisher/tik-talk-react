import { z } from 'zod'

export const setupProfileSchema = z.object({
  firstName: z.string().min(1, 'Введите имя'),
  lastName: z.string().min(1, 'Введите фамилию'),
  username: z.string(),
  description: z.string(),
  stack: z.array(z.string()),
  city: z.string(),
})

export type setupProfileFormValues = z.infer<typeof setupProfileSchema>
