/**
 * 截取url中参数
 * @param {String} urlStr   全URL地址 
 * @param {String} name     需截取的参数名
 */
export const getQueryString = (urlStr, name) => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = `?${urlStr.split('?')[1]}`.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}