const WEEKDAYS = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun'
]

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
 * Returns week day index from 0 to 6.
 * Month and day are not zero based.
 * JavaScript Date class is Sunday to Saturday based but we want Monday to Sunday.
 */
function weekDayIndex (year, month, day = 1) {
  const date = new Date(`${year}-${month}-${day}`)
  const d = date.getDay()
  if (d === 0) return 6 // sunday
  else return d - 1 // monday to saturday
}

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
  if (month === 2) return isLeapYear(year) ? 29 : 28
  else if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31
  else if ([4, 6, 9, 11].includes(month)) return 30
  else throw new Error(`invalid month ${month}`)
}

/**
 * Return the previous month
 */
function previousMonth ({ year, month }) {
  if (month === 1) {
    return { year: year - 1, month: 12 }
  } else {
    return { year, month: month - 1 }
  }
}

/**
 * Return the next month
 */
function nextMonth ({ year, month }) {
  if (month === 12) {
    return { year: year + 1, month: 1 }
  } else {
    return { year, month: month + 1 }
  }
}

/**
 * Return an array of days for a month.
 */
function monthDays ({ year, month }) {
  const numberOfDays = daysPerMonth(year, month)
  const result = []

  let weekdayIndex = weekDayIndex(year, month)
  for (let day = 1; day <= numberOfDays; ++day) {
    result.push({
      year,
      month,
      day,
      weekday: weekdayIndex
    })
    weekdayIndex = (weekdayIndex + 1) % 7
  }

  return result
}

module.exports = {
  WEEKDAYS,
  MONTHS,
  weekDayIndex,
  isLeapYear,
  daysPerMonth,
  previousMonth,
  nextMonth,
  monthDays
}
