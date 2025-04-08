import api from '@/api/axios.ts'

export const getPackages = () => api.get('/packages')
export const getPackageDetails = (packageId: string) =>
  api.get(`/packages/${packageId}/details`)
