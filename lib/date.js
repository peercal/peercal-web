const { pad } = require('./util.js')

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
    result.push({ date: new Date(`${year}-${pad(month + 1)}-${pad(day)}`) })
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

function weekDayIndex (date) {
  const d = date.getDay()
  if (d === 0) return SUNDAY
  else return d - 1 // monday to saturday
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

/**
 * Return a week number for a date.
 */
function calculateWeekNumber (d) {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

/**
 * Return an array of week days given a date
 * TODO test this.
 */
function getWeekDays (date) {
  const result = [{ date }]
  const index = weekDayIndex(date)

  // Prepend days if we're not a monday.
  if (index > MONDAY) {
    for (let i = index - 1; i >= MONDAY; --i) {
      const d = new Date(date)
      const offset = i - index
      d.setDate(date.getDate() + offset)
      result.unshift({ date: d })
    }
  }

  // Append days if we're not a sunday.
  if (index < SUNDAY) {
    for (let i = index + 1; i <= SUNDAY; ++i) {
      const d = new Date(date)
      const offset = i - index
      d.setDate(date.getDate() + offset)
      result.push({ date: d })
    }
  }

  return result
}

/**
 * Gets the start of the day given a date.
 */
function startOfDay (date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0))
}

/**
 * Gets the end of the day given a date.
 */
function endOfDay (date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59))
}

/**
 * Returns true if a date is today
 */
function isToday (date) {
  const now = new Date()
  return (date.getFullYear() === now.getFullYear() &&
          date.getMonth() === now.getMonth() &&
          date.getDate() === now.getDate())
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
  calculateWeekNumber,
  getWeekDays,
  weekDayIndex,
  startOfDay,
  endOfDay,
  isToday
}
