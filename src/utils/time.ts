// 获取当前时间并推出是上午、下午、晚上
function getTime() {
  let hours = new Date().getHours()
  let message = ''
  if (hours < 9) {
    message = '早上好'
  } else if (hours < 12) {
    message = '上午好'
  } else if (hours < 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}
export default getTime
