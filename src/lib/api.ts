import axios from 'axios'
import axiosCaseConverter from 'axios-case-converter'

// Buat instance axios dengan case converter
const api = axiosCaseConverter(
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
  }),
  {
    ignoreHeaders: true, // Biarkan header tetap asli (opsional)
  }
)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})



export default api