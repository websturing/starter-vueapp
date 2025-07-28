import axios from 'axios'
import axiosCaseConverter from 'axios-case-converter'

// Buat instance axios dengan case converter
const api = axiosCaseConverter(
  axios.create({
    baseURL: 'https://api.starter.localhost',
    withCredentials: true,
  }),
  {
    ignoreHeaders: true, // Biarkan header tetap asli (opsional)
  }
)

// Auto-attach X-XSRF-TOKEN (tetap bekerja setelah case converter)
api.interceptors.request.use((config: any) => {
  const xsrfToken = getCookie('XSRF-TOKEN')
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)
  }
  return config
})

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export default api