let loginObj = {
  token: '123456'
}

let userInfo = {
  "id": "1",
  "username": "admin",
  "organization": "0",
  "source": "qy",
  "roles": [
    'admin',
    'basic'
  ]
}

export default {
  'post-auth/login': loginObj,
  'get-auth/user': userInfo
}