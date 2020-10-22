import fetch from '@/utils/http'

export const login = (username, password, rememberMe) => {
  return fetch({
    url: 'auth/login',
    method: 'POST',
    data: {
      username,
      password,
      rememberMe
    },
    token: false,
    loading: false
  })
}

export const getInfo = () => {
  return fetch({
    url: 'auth/user',
    loading: false
  })
}