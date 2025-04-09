import axios from 'axios'

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

Axios.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken')

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }

  return config
})
