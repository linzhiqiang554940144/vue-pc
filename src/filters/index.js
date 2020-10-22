//示例
export const formatDateStr = (str) => {
  if(!str) return ''
  if(str.length === 8) return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)}`
  if(str.length === 12) return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)} ${str.substr(8, 2)}:${str.substr(10, 2)}`
  if(str.length === 14) return `${str.substr(0, 4)}-${str.substr(4, 2)}-${str.substr(6, 2)} ${str.substr(8, 2)}:${str.substr(10, 2)}:${str.substr(12, 2)}`
  return str
}