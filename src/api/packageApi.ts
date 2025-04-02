import api from '@/api/axios.ts'

export const getPackages = () => api.get('/packages')
