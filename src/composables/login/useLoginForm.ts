// src/composables/useLoginForm.ts
import { loginSchema } from '@/schemas/login/loginSchema'
import { useAuthStore } from '@/stores/auth'
import { useField, useForm } from 'vee-validate'

export function useLoginForm() {
  const auth = useAuthStore()

  const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: loginSchema,
  })

  const { value: email } = useField<string>('email')
  const { value: password } = useField<string>('password')

  const onSubmit = handleSubmit(async (values) => {
    await auth.login()
  })

  return {
    email,
    password,
    errors,
    isSubmitting,
    onSubmit,
  }
}
