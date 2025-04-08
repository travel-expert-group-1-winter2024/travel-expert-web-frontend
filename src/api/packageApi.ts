import api from '@/api/axios.ts'

export const getPackages = () => api.get('/packages')
export const getPackageDetails = (packageId: string) =>
  api.get(`/packages/${packageId}/details`)

export const getSearchAndSortPackage = ({
  search,
  sortBy,
  order,
}: {
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
} = {}) => {
  const query = new URLSearchParams()

  if (search) query.append('search', search)
  if (sortBy) query.append('sortBy', sortBy)
  if (order) query.append('order', order)

  return api.get(`/packages/search?${query.toString()}`)
}
