// src/schemas/loginSchema.ts
import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6, 'Password must be at least 6 characters long'),
})
