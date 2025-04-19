import api from '@/api/axios.ts'

export const getRatings = (packageId: number) =>
  api.get(`/api/ratings/${packageId}`)
