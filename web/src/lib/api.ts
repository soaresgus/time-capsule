import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://time-capsule-api.onrender.com',
})
