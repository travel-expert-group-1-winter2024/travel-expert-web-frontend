import api from '@/api/axios.ts'

export const getAllAgencies = () => api.get('/api/agencies')
