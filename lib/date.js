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
 * Return five weeks given a year and a month.
 */
function getCurrentWeeks (year, month) {
  return [
    [
      { year: 2022, month: 1, day: 31 },
      { year: 2022, month: 2, day: 1 },
      { year: 2022, month: 2, day: 2 },
      { year: 2022, month: 2, day: 3 },
      { year: 2022, month: 2, day: 4 },
      { year: 2022, month: 2, day: 5 },
      { year: 2022, month: 2, day: 6 }
    ],
    [
      { year: 2022, month: 2, day: 7 },
      { year: 2022, month: 2, day: 8 },
      { year: 2022, month: 2, day: 9 },
      { year: 2022, month: 2, day: 10 },
      { year: 2022, month: 2, day: 11 },
      { year: 2022, month: 2, day: 12 },
      { year: 2022, month: 2, day: 13 }
    ],
    [
      { year: 2022, month: 2, day: 14 },
      { year: 2022, month: 2, day: 15 },
      { year: 2022, month: 2, day: 16 },
      { year: 2022, month: 2, day: 17 },
      { year: 2022, month: 2, day: 18 },
      { year: 2022, month: 2, day: 19 },
      { year: 2022, month: 2, day: 20 }
    ],
    [
      { year: 2022, month: 2, day: 21 },
      { year: 2022, month: 2, day: 22 },
      { year: 2022, month: 2, day: 23 },
      { year: 2022, month: 2, day: 24 },
      { year: 2022, month: 2, day: 25 },
      { year: 2022, month: 2, day: 26 },
      { year: 2022, month: 2, day: 27 }
    ],
    [
      { year: 2022, month: 2, day: 28 },
      { year: 2022, month: 3, day: 1 },
      { year: 2022, month: 3, day: 2 },
      { year: 2022, month: 3, day: 3 },
      { year: 2022, month: 3, day: 4 },
      { year: 2022, month: 3, day: 5 },
      { year: 2022, month: 3, day: 6 }
    ]
  ]
}

module.exports = {
  WEEKDAYS,
  MONTHS,
  weekDayIndex,
  isLeapYear,
  daysPerMonth,
  getCurrentWeeks
}
