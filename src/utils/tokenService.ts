let token: string | null = null

export const setToken = (newToken: string) => {
  token = newToken
}

export const getToken = () => token
