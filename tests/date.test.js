const test = require('ava')
const {
  weekDayIndex,
  isLeapYear,
  daysPerMonth,
  previousMonth,
  nextMonth,
  monthDays
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

test('previousMonth()', t => {
  t.deepEqual(previousMonth({ year: 2022, month: 3 }), { year: 2022, month: 2 })
  t.deepEqual(previousMonth({ year: 2022, month: 2 }), { year: 2022, month: 1 })
  t.deepEqual(previousMonth({ year: 2022, month: 1 }), { year: 2021, month: 12 })
})

test('nextMonth()', t => {
  t.deepEqual(nextMonth({ year: 2022, month: 3 }), { year: 2022, month: 4 })
  t.deepEqual(nextMonth({ year: 2022, month: 2 }), { year: 2022, month: 3 })
  t.deepEqual(nextMonth({ year: 2022, month: 12 }), { year: 2023, month: 1 })
})

test('monthDays()', t => {
  t.true(Array.isArray(monthDays({ year: 2000, month: 1 })))

  t.deepEqual(monthDays({ year: 2022, month: 1 }), [
    { year: 2022, month: 1, day: 1, weekday: 5 },
    { year: 2022, month: 1, day: 2, weekday: 6 },
    { year: 2022, month: 1, day: 3, weekday: 0 },
    { year: 2022, month: 1, day: 4, weekday: 1 },
    { year: 2022, month: 1, day: 5, weekday: 2 },
    { year: 2022, month: 1, day: 6, weekday: 3 },
    { year: 2022, month: 1, day: 7, weekday: 4 },
    { year: 2022, month: 1, day: 8, weekday: 5 },
    { year: 2022, month: 1, day: 9, weekday: 6 },
    { year: 2022, month: 1, day: 10, weekday: 0 },
    { year: 2022, month: 1, day: 11, weekday: 1 },
    { year: 2022, month: 1, day: 12, weekday: 2 },
    { year: 2022, month: 1, day: 13, weekday: 3 },
    { year: 2022, month: 1, day: 14, weekday: 4 },
    { year: 2022, month: 1, day: 15, weekday: 5 },
    { year: 2022, month: 1, day: 16, weekday: 6 },
    { year: 2022, month: 1, day: 17, weekday: 0 },
    { year: 2022, month: 1, day: 18, weekday: 1 },
    { year: 2022, month: 1, day: 19, weekday: 2 },
    { year: 2022, month: 1, day: 20, weekday: 3 },
    { year: 2022, month: 1, day: 21, weekday: 4 },
    { year: 2022, month: 1, day: 22, weekday: 5 },
    { year: 2022, month: 1, day: 23, weekday: 6 },
    { year: 2022, month: 1, day: 24, weekday: 0 },
    { year: 2022, month: 1, day: 25, weekday: 1 },
    { year: 2022, month: 1, day: 26, weekday: 2 },
    { year: 2022, month: 1, day: 27, weekday: 3 },
    { year: 2022, month: 1, day: 28, weekday: 4 },
    { year: 2022, month: 1, day: 29, weekday: 5 },
    { year: 2022, month: 1, day: 30, weekday: 6 },
    { year: 2022, month: 1, day: 31, weekday: 0 }
  ])

  t.deepEqual(monthDays({ year: 2022, month: 2 }), [
    { year: 2022, month: 2, day: 1, weekday: 1 },
    { year: 2022, month: 2, day: 2, weekday: 2 },
    { year: 2022, month: 2, day: 3, weekday: 3 },
    { year: 2022, month: 2, day: 4, weekday: 4 },
    { year: 2022, month: 2, day: 5, weekday: 5 },
    { year: 2022, month: 2, day: 6, weekday: 6 },
    { year: 2022, month: 2, day: 7, weekday: 0 },
    { year: 2022, month: 2, day: 8, weekday: 1 },
    { year: 2022, month: 2, day: 9, weekday: 2 },
    { year: 2022, month: 2, day: 10, weekday: 3 },
    { year: 2022, month: 2, day: 11, weekday: 4 },
    { year: 2022, month: 2, day: 12, weekday: 5 },
    { year: 2022, month: 2, day: 13, weekday: 6 },
    { year: 2022, month: 2, day: 14, weekday: 0 },
    { year: 2022, month: 2, day: 15, weekday: 1 },
    { year: 2022, month: 2, day: 16, weekday: 2 },
    { year: 2022, month: 2, day: 17, weekday: 3 },
    { year: 2022, month: 2, day: 18, weekday: 4 },
    { year: 2022, month: 2, day: 19, weekday: 5 },
    { year: 2022, month: 2, day: 20, weekday: 6 },
    { year: 2022, month: 2, day: 21, weekday: 0 },
    { year: 2022, month: 2, day: 22, weekday: 1 },
    { year: 2022, month: 2, day: 23, weekday: 2 },
    { year: 2022, month: 2, day: 24, weekday: 3 },
    { year: 2022, month: 2, day: 25, weekday: 4 },
    { year: 2022, month: 2, day: 26, weekday: 5 },
    { year: 2022, month: 2, day: 27, weekday: 6 },
    { year: 2022, month: 2, day: 28, weekday: 0 }
  ])

  t.deepEqual(monthDays({ year: 2020, month: 2 }), [
    { year: 2020, month: 2, day: 1, weekday: 5 },
    { year: 2020, month: 2, day: 2, weekday: 6 },
    { year: 2020, month: 2, day: 3, weekday: 0 },
    { year: 2020, month: 2, day: 4, weekday: 1 },
    { year: 2020, month: 2, day: 5, weekday: 2 },
    { year: 2020, month: 2, day: 6, weekday: 3 },
    { year: 2020, month: 2, day: 7, weekday: 4 },
    { year: 2020, month: 2, day: 8, weekday: 5 },
    { year: 2020, month: 2, day: 9, weekday: 6 },
    { year: 2020, month: 2, day: 10, weekday: 0 },
    { year: 2020, month: 2, day: 11, weekday: 1 },
    { year: 2020, month: 2, day: 12, weekday: 2 },
    { year: 2020, month: 2, day: 13, weekday: 3 },
    { year: 2020, month: 2, day: 14, weekday: 4 },
    { year: 2020, month: 2, day: 15, weekday: 5 },
    { year: 2020, month: 2, day: 16, weekday: 6 },
    { year: 2020, month: 2, day: 17, weekday: 0 },
    { year: 2020, month: 2, day: 18, weekday: 1 },
    { year: 2020, month: 2, day: 19, weekday: 2 },
    { year: 2020, month: 2, day: 20, weekday: 3 },
    { year: 2020, month: 2, day: 21, weekday: 4 },
    { year: 2020, month: 2, day: 22, weekday: 5 },
    { year: 2020, month: 2, day: 23, weekday: 6 },
    { year: 2020, month: 2, day: 24, weekday: 0 },
    { year: 2020, month: 2, day: 25, weekday: 1 },
    { year: 2020, month: 2, day: 26, weekday: 2 },
    { year: 2020, month: 2, day: 27, weekday: 3 },
    { year: 2020, month: 2, day: 28, weekday: 4 },
    { year: 2020, month: 2, day: 29, weekday: 5 }
  ])

  t.deepEqual(monthDays({ year: 2022, month: 6 }), [
    { year: 2022, month: 6, day: 1, weekday: 2 },
    { year: 2022, month: 6, day: 2, weekday: 3 },
    { year: 2022, month: 6, day: 3, weekday: 4 },
    { year: 2022, month: 6, day: 4, weekday: 5 },
    { year: 2022, month: 6, day: 5, weekday: 6 },
    { year: 2022, month: 6, day: 6, weekday: 0 },
    { year: 2022, month: 6, day: 7, weekday: 1 },
    { year: 2022, month: 6, day: 8, weekday: 2 },
    { year: 2022, month: 6, day: 9, weekday: 3 },
    { year: 2022, month: 6, day: 10, weekday: 4 },
    { year: 2022, month: 6, day: 11, weekday: 5 },
    { year: 2022, month: 6, day: 12, weekday: 6 },
    { year: 2022, month: 6, day: 13, weekday: 0 },
    { year: 2022, month: 6, day: 14, weekday: 1 },
    { year: 2022, month: 6, day: 15, weekday: 2 },
    { year: 2022, month: 6, day: 16, weekday: 3 },
    { year: 2022, month: 6, day: 17, weekday: 4 },
    { year: 2022, month: 6, day: 18, weekday: 5 },
    { year: 2022, month: 6, day: 19, weekday: 6 },
    { year: 2022, month: 6, day: 20, weekday: 0 },
    { year: 2022, month: 6, day: 21, weekday: 1 },
    { year: 2022, month: 6, day: 22, weekday: 2 },
    { year: 2022, month: 6, day: 23, weekday: 3 },
    { year: 2022, month: 6, day: 24, weekday: 4 },
    { year: 2022, month: 6, day: 25, weekday: 5 },
    { year: 2022, month: 6, day: 26, weekday: 6 },
    { year: 2022, month: 6, day: 27, weekday: 0 },
    { year: 2022, month: 6, day: 28, weekday: 1 },
    { year: 2022, month: 6, day: 29, weekday: 2 },
    { year: 2022, month: 6, day: 30, weekday: 3 }
  ])
})
