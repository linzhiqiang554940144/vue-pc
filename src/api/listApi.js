import fetch from '@/utils/http'

export const baseQuery = (url, pageNumber, pageSize, formObj) => {
  return fetch({
    url,
    data: {
      pageNumber,
      pageSize,
      ...formObj
    }
  })
}

export const baseInsert = (url, formObj) => {
  return fetch({
    url,
    method: 'POST',
    data: formObj,
    loading: false
  })
}

export const baseUpdate = (url, formObj) => {
  return fetch({
    url,
    method: 'POST',
    data: formObj,
    loading: false
  })
}

export const baseDelete = (url, nbbhs) => {
  return fetch({
    url,
    method: 'POST',
    data: {
      nbbhs
    },
    loading: false
  })
}

export const baseList = (pageNumber, pageSize, formObj) => {
  return fetch({
    url: 'api/list',
    data: {
      pageNumber,
      pageSize,
      formObj
    }
  })
}