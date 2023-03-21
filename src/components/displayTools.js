import { date } from 'quasar'

function displayDateTime(ts, nullLabel = '') {
  return ts ? date.formatDate(ts, 'YYYY-MMM-D H:mm:ss') : nullLabel
}

export { displayDateTime }
