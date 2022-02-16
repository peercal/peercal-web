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
const FEBRUARY = 1

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
function daysPerMonth (date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  if (month === FEBRUARY) return isLeapYear(year) ? 29 : 28
  else if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31
  else if ([3, 5, 8, 10].includes(month)) return 30
  else throw new Error(`invalid month ${month}`)
}

/**
 * Return the previous month
 */
function previousMonth (date) {
  const prev = new Date(date)
  prev.setMonth(date.getMonth() - 1)
  return prev
}

/**
 * Return the next month
 */
function nextMonth (date) {
  const next = new Date(date)
  next.setMonth(date.getMonth() + 1)
  return next
}

/**
 * Return an array of days for a month given a date in that month
 */
function monthDays (date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const numberOfDays = daysPerMonth(date)
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
function monthDaysFilled (date) {
  let days = monthDays(date)

  function weekDayIndex (date) {
    const d = date.getDay()
    if (d === 0) return 6 // sunday
    else return d - 1 // monday to saturday
  }

  // Prepend days from previous month if this month doesn't start with monday
  const firstWeekDay = weekDayIndex(days[0].date)
  if (firstWeekDay > MONDAY) {
    const prev = monthDays(previousMonth(date))
    days = prev.slice(-firstWeekDay).concat(days)
  }

  // Append days from next month if this month doesn't end with a sunday
  const lastWeekDay = weekDayIndex(days[days.length - 1].date)
  if (lastWeekDay < SUNDAY) {
    const next = monthDays(nextMonth(date))
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

module.exports = {
  WEEKDAYS,
  MONTHS,
  isLeapYear,
  daysPerMonth,
  previousMonth,
  nextMonth,
  monthDays,
  monthDaysFilled,
  daysToWeeks
}
