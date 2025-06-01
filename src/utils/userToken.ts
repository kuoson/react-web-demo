const TOKEN_KEY = 'tokenKey'

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}
