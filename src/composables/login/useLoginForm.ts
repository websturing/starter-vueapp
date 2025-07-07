// src/composables/useLoginForm.ts
import { loginSchema } from '@/schemas/login/loginSchema'
import { useAuthStore } from '@/stores/auth'
import { push } from 'notivue'
import { useField, useForm } from 'vee-validate'

export function useLoginForm() {
  const auth = useAuthStore()

  const { handleSubmit, errors, isSubmitting } = useForm({
    validationSchema: loginSchema,
  })

  const { value: email } = useField<string>('email')
  const { value: password } = useField<string>('password')

  const onSubmit = handleSubmit(async (values) => {
    const notification = push.promise("We're sending your Credential, hold on...")
     try {
      const response = await auth.login(values)
      notification.resolve({
      message: `Successfully.`,  
    })
     }catch (error) {
    console.error(error)
    notification.reject("Invalid credentials, please try again.")
  }

  })

  return {
    email,
    password,
    errors,
    isSubmitting,
    onSubmit,
  }
}
