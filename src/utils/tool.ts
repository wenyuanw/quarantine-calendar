export const getCurDate = function () {
  let nowDate = new Date()
  let year = nowDate.getFullYear()
  let month = nowDate.getMonth() + 1 + ''
  let day = nowDate.getDate() + ''
  if (nowDate.getMonth() + 1 < 10) month = '0' + month
  if (nowDate.getDate() < 10) day = '0' + day
  return year + '-' + month + '-' + day
}

export const dateToNum = (date: any) => {
  return parseInt(date.split('-').join(''))
}