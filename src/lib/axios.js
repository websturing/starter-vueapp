import axios from 'axios'


const api = axios.create({
  baseURL: 'https://api.starter.localhost',
  withCredentials: true,
})

// Optional: Auto attach X-XSRF-TOKEN jika pakai cookie
api.interceptors.request.use((config) => {
  const xsrfToken = getCookie('XSRF-TOKEN')
  if (xsrfToken) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)
  }
  return config
})

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export default api