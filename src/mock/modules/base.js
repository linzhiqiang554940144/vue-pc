const list = [
  {
    'idCard': '@id()',
    'id|+1': 1,
    'nbbh': '@guid()',
    'name': '@cname',
    'gender': '@pick([0, 1])',
    'age': '@integer(0, 60)',
    'address': '@county(true)',
    'tags': ['nice', 'developer', 'loser', 'cool', 'teacher']
  }
]

const pageWrapper = (list) => ({
  "records|100": list,
  "total": 100,
  "size": 10,
  "current": 1,
  "pages": 10
})

export default {
  'get-api/list': pageWrapper(list),
  'post-api/insert': '',
  'post-api/update': '',
  'post-api/delete': '',
}