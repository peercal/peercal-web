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
 * Return five weeks from current month and year.
 * TODO: currently hardcoded (can write tests for this)
 */
function getCurrentWeeks (month, year) {
  // TODO this is currently quite verbose, maybe we can do some fun date math instead?
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
  getCurrentWeeks
}
