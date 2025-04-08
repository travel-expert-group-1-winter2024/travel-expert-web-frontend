import api from "@/api/axios"
import { ratingsView } from "@/types/ratings"
import { useQuery } from "@tanstack/react-query"

export const useRatings = (packageId: number) => {
    return useQuery<ratingsView[]>({
      queryKey: ['getAllRatings',packageId],
          queryFn: () => api.get(`/api/ratings/${packageId}`).then(res => res.data),
    })
}