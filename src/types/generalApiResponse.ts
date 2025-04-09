export interface GeneralApiResponse<T> {
  data: T
  errors?: ErrorResponse
}

export interface ErrorResponse {
  fields?: string
  detail?: string
}
