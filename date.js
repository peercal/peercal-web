const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
]

function monthToString (month) {
  return MONTHS[month]
}

module.exports = {
  monthToString
}
