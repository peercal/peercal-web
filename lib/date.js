// TODO use locale
const WEEKDAYS = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun'
]

// TODO use locale
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

/**
 * Month constants.
 */
const JANUARY = 0
const FEBRUARY = 1
const DECEMBER = 11

/**
 * Day constants.
 */
const MONDAY = 0
const SUNDAY = 6

/**
 * Return true if year is a leap year.
 */
function isLeapYear (year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Return the number of days in a month.
 */
function daysPerMonth (year, month) {
  if (month === FEBRUARY) return isLeapYear(year) ? 29 : 28
  else if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31
  else if ([3, 5, 8, 10].includes(month)) return 30
  else throw new Error(`invalid month ${month}`)
}

/**
 * Return the previous month
 */
function previousMonth ({ year, month }) {
  if (month === JANUARY) {
    return { year: year - 1, month: DECEMBER }
  } else {
    return { year, month: month - 1 }
  }
}

/**
 * Return the next month
 */
function nextMonth ({ year, month }) {
  if (month === DECEMBER) {
    return { year: year + 1, month: JANUARY }
  } else {
    return { year, month: month + 1 }
  }
}

/**
 * Return an array of days for a month given a date in that month
 */
function monthDays ({ year, month }) {
  const numberOfDays = daysPerMonth(year, month)
  const result = []
  for (let day = 1; day <= numberOfDays; ++day) {
    result.push({ date: new Date(`${year}-${month + 1}-${day}`) })
  }
  return result
}

/**
 * Return an array of days for a month including days
 * from the previous and next months, if needed to fill
 * up complete weeks.
 */
function monthDaysFilled (opts) {
  let days = monthDays(opts)

  function weekDayIndex (date) {
    const d = date.getDay()
    if (d === 0) return 6 // sunday
    else return d - 1 // monday to saturday
  }

  // Prepend days from previous month if this month doesn't start with monday
  const firstWeekDay = weekDayIndex(days[0].date)
  if (firstWeekDay > MONDAY) {
    const prev = monthDays(previousMonth(opts))
    days = prev.slice(-firstWeekDay).concat(days)
  }

  // Append days from next month if this month doesn't end with a sunday
  const lastWeekDay = weekDayIndex(days[days.length - 1].date)
  if (lastWeekDay < SUNDAY) {
    const next = monthDays(nextMonth(opts))
    days = days.concat(next.slice(0, SUNDAY - lastWeekDay))
  }

  return days
}

/**
 * Split up an array of days into array of weeks.
 */
function daysToWeeks (days) {
  const result = []

  let currentWeek = null
  for (let i = 0; i < days.length; ++i) {
    if (i % 7 === 0) {
      // This is a monday so we start a new week.
      currentWeek = []
    }
    currentWeek.push(days[i])
    if ((i + 1) % 7 === 0 || i === days.length - 1) {
      result.push(currentWeek)
    }
  }

  return result
}

function paddedTime (date) {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

module.exports = {
  WEEKDAYS,
  MONTHS,
  isLeapYear,
  daysPerMonth,
  previousMonth,
  nextMonth,
  monthDays,
  monthDaysFilled,
  daysToWeeks,
  paddedTime
}
