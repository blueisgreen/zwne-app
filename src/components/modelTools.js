import { date } from 'quasar'

const generateRandomKey = (length = 12) => {
  let result = ''
  const spectrum =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var spectrumLength = spectrum.length
  for (var i = 0; i < length; i++) {
    result += spectrum.charAt(Math.floor(Math.random() * spectrumLength))
  }
  return result
}
function toAWSDateTime(ts) {
  return date.formatDate(ts, 'YYYY-MM-DDThh:mm:ss.sssZ')
}

const difference = (first, second) => {
  console.log('difference', { first, second })
  let arrays = [first, second]
  return arrays.reduce((a, b) => a.filter((c) => !b.includes(c)))
}

export { generateRandomKey, toAWSDateTime, difference }
