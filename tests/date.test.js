const test = require('ava')
const {
  weekDayIndex,
  isLeapYear,
  daysPerMonth,
  getCurrentWeeks
} = require('../lib/date.js')

test('weekDayIndex()', t => {
  t.is(weekDayIndex(2020, 10, 5), 0)
  t.is(weekDayIndex(2020, 10, 6), 1)
  t.is(weekDayIndex(2020, 10, 7), 2)
  t.is(weekDayIndex(2020, 10, 8), 3)
  t.is(weekDayIndex(2020, 10, 9), 4)
  t.is(weekDayIndex(2020, 10, 10), 5)
  t.is(weekDayIndex(2020, 10, 11), 6)

  t.is(weekDayIndex(2022, 1, 31), 0)
  t.is(weekDayIndex(2022, 2, 1), 1)
  t.is(weekDayIndex(2022, 2, 2), 2)
  t.is(weekDayIndex(2022, 2, 3), 3)
  t.is(weekDayIndex(2022, 2, 4), 4)
  t.is(weekDayIndex(2022, 2, 5), 5)
  t.is(weekDayIndex(2022, 2, 6), 6)

  // Default day is the first day of the month.
  t.is(weekDayIndex(2022, 2, 1), weekDayIndex(2022, 2))
})

test('isLeapYear()', t => {
  t.is(isLeapYear(1600), true)
  t.is(isLeapYear(1700), false)
  t.is(isLeapYear(1800), false)
  t.is(isLeapYear(1900), false)
  t.is(isLeapYear(2000), true)
  t.is(isLeapYear(2016), true)
  t.is(isLeapYear(2020), true)
  t.is(isLeapYear(2022), false)
  t.is(isLeapYear(2100), false)
  t.is(isLeapYear(2200), false)
  t.is(isLeapYear(2300), false)
})

test('daysPerMonth()', t => {
  t.is(daysPerMonth(2022, 1), 31)
  t.is(daysPerMonth(2022, 2), 28)
  t.is(daysPerMonth(2022, 3), 31)
  t.is(daysPerMonth(2022, 4), 30)
  t.is(daysPerMonth(2022, 5), 31)
  t.is(daysPerMonth(2022, 6), 30)
  t.is(daysPerMonth(2022, 7), 31)
  t.is(daysPerMonth(2022, 8), 31)
  t.is(daysPerMonth(2022, 9), 30)
  t.is(daysPerMonth(2022, 10), 31)
  t.is(daysPerMonth(2022, 11), 30)
  t.is(daysPerMonth(2022, 12), 31)

  t.is(daysPerMonth(2020, 2), 29)
  t.is(daysPerMonth(1600, 2), 29)
})

test('getCurrentWeeks()', t => {
  t.true(Array.isArray(getCurrentWeeks(2000, 1)))

  /*
  const jan2022 = getCurrentWeeks(2022, 0)
  t.deepEqual(
    jan2022,
    [
      [
        { year: 2021, month: 12, day: 27 },
        { year: 2021, month: 12, day: 28 },
        { year: 2021, month: 12, day: 29 },
        { year: 2021, month: 12, day: 30 },
        { year: 2021, month: 12, day: 31 },
        { year: 2022, month: 1, day: 1 },
        { year: 2022, month: 1, day: 2 }
      ],
      [
        { year: 2022, month: 1, day: 3 },
        { year: 2022, month: 1, day: 4 },
        { year: 2022, month: 1, day: 5 },
        { year: 2022, month: 1, day: 6 },
        { year: 2022, month: 1, day: 7 },
        { year: 2022, month: 1, day: 8 },
        { year: 2022, month: 1, day: 9 }
      ],
      [
        { year: 2022, month: 1, day: 10 },
        { year: 2022, month: 1, day: 11 },
        { year: 2022, month: 1, day: 12 },
        { year: 2022, month: 1, day: 13 },
        { year: 2022, month: 1, day: 14 },
        { year: 2022, month: 1, day: 15 },
        { year: 2022, month: 1, day: 16 }
      ],
      [
        { year: 2022, month: 1, day: 17 },
        { year: 2022, month: 1, day: 18 },
        { year: 2022, month: 1, day: 19 },
        { year: 2022, month: 1, day: 20 },
        { year: 2022, month: 1, day: 21 },
        { year: 2022, month: 1, day: 22 },
        { year: 2022, month: 1, day: 23 }
      ],
      [
        { year: 2022, month: 1, day: 24 },
        { year: 2022, month: 1, day: 25 },
        { year: 2022, month: 1, day: 26 },
        { year: 2022, month: 1, day: 27 },
        { year: 2022, month: 1, day: 28 },
        { year: 2022, month: 1, day: 29 },
        { year: 2022, month: 1, day: 30 }
      ],
      [
        { year: 2022, month: 1, day: 31 },
        { year: 2022, month: 2, day: 1 },
        { year: 2022, month: 2, day: 2 },
        { year: 2022, month: 2, day: 3 },
        { year: 2022, month: 2, day: 4 },
        { year: 2022, month: 2, day: 5 },
        { year: 2022, month: 2, day: 6 }
      ]
    ]
  )

  const feb2022 = getCurrentWeeks(2022, 1)
  t.deepEqual(
    feb2022,
    [
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
  )

  const may2022 = getCurrentWeeks(2022, 4)
  t.deepEqual(
    may2022,
    [
      [
        { year: 2022, month: 4, day: 25 },
        { year: 2022, month: 4, day: 26 },
        { year: 2022, month: 4, day: 27 },
        { year: 2022, month: 4, day: 28 },
        { year: 2022, month: 4, day: 29 },
        { year: 2022, month: 4, day: 30 },
        { year: 2022, month: 5, day: 1 }
      ],
      [
        { year: 2022, month: 5, day: 2 },
        { year: 2022, month: 5, day: 3 },
        { year: 2022, month: 5, day: 4 },
        { year: 2022, month: 5, day: 5 },
        { year: 2022, month: 5, day: 6 },
        { year: 2022, month: 5, day: 7 },
        { year: 2022, month: 5, day: 8 }
      ],
      [
        { year: 2022, month: 5, day: 9 },
        { year: 2022, month: 5, day: 10 },
        { year: 2022, month: 5, day: 11 },
        { year: 2022, month: 5, day: 12 },
        { year: 2022, month: 5, day: 13 },
        { year: 2022, month: 5, day: 14 },
        { year: 2022, month: 5, day: 15 }
      ],
      [
        { year: 2022, month: 5, day: 16 },
        { year: 2022, month: 5, day: 17 },
        { year: 2022, month: 5, day: 18 },
        { year: 2022, month: 5, day: 19 },
        { year: 2022, month: 5, day: 20 },
        { year: 2022, month: 5, day: 21 },
        { year: 2022, month: 5, day: 22 }
      ],
      [
        { year: 2022, month: 5, day: 23 },
        { year: 2022, month: 5, day: 24 },
        { year: 2022, month: 5, day: 25 },
        { year: 2022, month: 5, day: 26 },
        { year: 2022, month: 5, day: 27 },
        { year: 2022, month: 5, day: 28 },
        { year: 2022, month: 5, day: 29 }
      ],
      [
        { year: 2022, month: 5, day: 30 },
        { year: 2022, month: 5, day: 31 },
        { year: 2022, month: 6, day: 1 },
        { year: 2022, month: 6, day: 2 },
        { year: 2022, month: 6, day: 3 },
        { year: 2022, month: 6, day: 4 },
        { year: 2022, month: 6, day: 5 }
      ]
    ]
  )

  const jun2022 = getCurrentWeeks(2022, 5)
  t.deepEqual(
    jun2022,
    [
      [
        { year: 2022, month: 5, day: 30 },
        { year: 2022, month: 5, day: 31 },
        { year: 2022, month: 6, day: 1 },
        { year: 2022, month: 6, day: 2 },
        { year: 2022, month: 6, day: 3 },
        { year: 2022, month: 6, day: 4 },
        { year: 2022, month: 6, day: 5 }
      ],
      [
        { year: 2022, month: 6, day: 6 },
        { year: 2022, month: 6, day: 7 },
        { year: 2022, month: 6, day: 8 },
        { year: 2022, month: 6, day: 9 },
        { year: 2022, month: 6, day: 10 },
        { year: 2022, month: 6, day: 11 },
        { year: 2022, month: 6, day: 12 }
      ],
      [
        { year: 2022, month: 6, day: 13 },
        { year: 2022, month: 6, day: 14 },
        { year: 2022, month: 6, day: 15 },
        { year: 2022, month: 6, day: 16 },
        { year: 2022, month: 6, day: 17 },
        { year: 2022, month: 6, day: 18 },
        { year: 2022, month: 6, day: 19 }
      ],
      [
        { year: 2022, month: 6, day: 20 },
        { year: 2022, month: 6, day: 21 },
        { year: 2022, month: 6, day: 22 },
        { year: 2022, month: 6, day: 23 },
        { year: 2022, month: 6, day: 24 },
        { year: 2022, month: 6, day: 25 },
        { year: 2022, month: 6, day: 26 }
      ],
      [
        { year: 2022, month: 6, day: 27 },
        { year: 2022, month: 6, day: 28 },
        { year: 2022, month: 6, day: 29 },
        { year: 2022, month: 6, day: 30 },
        { year: 2022, month: 7, day: 1 },
        { year: 2022, month: 7, day: 2 },
        { year: 2022, month: 7, day: 3 }
      ]
    ]
  )
  */
})
