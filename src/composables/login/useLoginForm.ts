// src/composables/useLoginForm.ts
import { loginSchema } from '@/schemas/login/loginSchema'
import { useAuthStore } from '@/stores/auth'
import { push } from 'notivue'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'


export function useLoginForm() {
  const auth = useAuthStore()
  const router = useRouter()
  const { handleSubmit, errors, isSubmitting } = useForm<{
    email: string
    password: string
  }>({
    validationSchema: loginSchema,
  })

  const { value: email } = useField<string>('email')
  const { value: password } = useField<string>('password')

  const onSubmit = handleSubmit(async (values) => {
    const notification = push.promise("We're sending your Credential, hold on...")
    try {
      const response = await auth.login(values)
      notification.resolve({
        message: `Great to have you back, ${response.data.data.user.email}! 🎉.`,
        duration: 2000,
      })

      await new Promise(resolve => setTimeout(resolve, 1200))

      await Promise.all([
      router.push('/dashboard'),
    ])
    
    } catch (error: any) {
      console.error(error)

      // Bisa tambahkan jika kamu pakai Axios
      const message = error?.response?.data?.message || 'Invalid credentials, please try again.'

      notification.reject({
        message,
      })
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
