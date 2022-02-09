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
function weekDayIndex (year, month, day) {
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
 * Return five weeks given a year and a month.
 */
function getCurrentWeeks (year, month) {
  return [
    [
      { year: 2022, month: 0, day: 31 },
      { year: 2022, month: 1, day: 1 },
      { year: 2022, month: 1, day: 2 },
      { year: 2022, month: 1, day: 3 },
      { year: 2022, month: 1, day: 4 },
      { year: 2022, month: 1, day: 5 },
      { year: 2022, month: 1, day: 6 }
    ],
    [
      { year: 2022, month: 1, day: 7 },
      { year: 2022, month: 1, day: 8 },
      { year: 2022, month: 1, day: 9 },
      { year: 2022, month: 1, day: 10 },
      { year: 2022, month: 1, day: 11 },
      { year: 2022, month: 1, day: 12 },
      { year: 2022, month: 1, day: 13 }
    ],
    [
      { year: 2022, month: 1, day: 14 },
      { year: 2022, month: 1, day: 15 },
      { year: 2022, month: 1, day: 16 },
      { year: 2022, month: 1, day: 17 },
      { year: 2022, month: 1, day: 18 },
      { year: 2022, month: 1, day: 19 },
      { year: 2022, month: 1, day: 20 }
    ],
    [
      { year: 2022, month: 1, day: 21 },
      { year: 2022, month: 1, day: 22 },
      { year: 2022, month: 1, day: 23 },
      { year: 2022, month: 1, day: 24 },
      { year: 2022, month: 1, day: 25 },
      { year: 2022, month: 1, day: 26 },
      { year: 2022, month: 1, day: 27 }
    ],
    [
      { year: 2022, month: 1, day: 28 },
      { year: 2022, month: 2, day: 1 },
      { year: 2022, month: 2, day: 2 },
      { year: 2022, month: 2, day: 3 },
      { year: 2022, month: 2, day: 4 },
      { year: 2022, month: 2, day: 5 },
      { year: 2022, month: 2, day: 6 }
    ]
  ]
}

module.exports = {
  WEEKDAYS,
  MONTHS,
  weekDayIndex,
  isLeapYear,
  getCurrentWeeks
}
