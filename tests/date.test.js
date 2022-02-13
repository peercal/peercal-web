const test = require('ava')
const {
  isLeapYear,
  daysPerMonth,
  previousMonth,
  nextMonth,
  monthDays
} = require('../lib/date.js')

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
  t.is(daysPerMonth(2022, 0), 31)
  t.is(daysPerMonth(2022, 1), 28)
  t.is(daysPerMonth(2022, 2), 31)
  t.is(daysPerMonth(2022, 3), 30)
  t.is(daysPerMonth(2022, 4), 31)
  t.is(daysPerMonth(2022, 5), 30)
  t.is(daysPerMonth(2022, 6), 31)
  t.is(daysPerMonth(2022, 7), 31)
  t.is(daysPerMonth(2022, 8), 30)
  t.is(daysPerMonth(2022, 9), 31)
  t.is(daysPerMonth(2022, 10), 30)
  t.is(daysPerMonth(2022, 11), 31)

  t.is(daysPerMonth(2020, 1), 29)
  t.is(daysPerMonth(1600, 1), 29)
})

test('previousMonth()', t => {
  t.deepEqual(previousMonth({ year: 2022, month: 2 }), { year: 2022, month: 1 })
  t.deepEqual(previousMonth({ year: 2022, month: 1 }), { year: 2022, month: 0 })
  t.deepEqual(previousMonth({ year: 2022, month: 0 }), { year: 2021, month: 11 })
})

test('nextMonth()', t => {
  t.deepEqual(nextMonth({ year: 2022, month: 2 }), { year: 2022, month: 3 })
  t.deepEqual(nextMonth({ year: 2022, month: 1 }), { year: 2022, month: 2 })
  t.deepEqual(nextMonth({ year: 2022, month: 11 }), { year: 2023, month: 0 })
})

test('monthDays()', t => {
  t.true(Array.isArray(monthDays({ year: 2000, month: 1 })))

  function toJson (day) {
    const { date } = day
    const d = date.getDay()
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      weekday: d === 0 ? 6 : d - 1
    }
  }

  t.deepEqual(monthDays({ year: 2022, month: 0 }).map(toJson), [
    { year: 2022, month: 0, day: 1, weekday: 5 },
    { year: 2022, month: 0, day: 2, weekday: 6 },
    { year: 2022, month: 0, day: 3, weekday: 0 },
    { year: 2022, month: 0, day: 4, weekday: 1 },
    { year: 2022, month: 0, day: 5, weekday: 2 },
    { year: 2022, month: 0, day: 6, weekday: 3 },
    { year: 2022, month: 0, day: 7, weekday: 4 },
    { year: 2022, month: 0, day: 8, weekday: 5 },
    { year: 2022, month: 0, day: 9, weekday: 6 },
    { year: 2022, month: 0, day: 10, weekday: 0 },
    { year: 2022, month: 0, day: 11, weekday: 1 },
    { year: 2022, month: 0, day: 12, weekday: 2 },
    { year: 2022, month: 0, day: 13, weekday: 3 },
    { year: 2022, month: 0, day: 14, weekday: 4 },
    { year: 2022, month: 0, day: 15, weekday: 5 },
    { year: 2022, month: 0, day: 16, weekday: 6 },
    { year: 2022, month: 0, day: 17, weekday: 0 },
    { year: 2022, month: 0, day: 18, weekday: 1 },
    { year: 2022, month: 0, day: 19, weekday: 2 },
    { year: 2022, month: 0, day: 20, weekday: 3 },
    { year: 2022, month: 0, day: 21, weekday: 4 },
    { year: 2022, month: 0, day: 22, weekday: 5 },
    { year: 2022, month: 0, day: 23, weekday: 6 },
    { year: 2022, month: 0, day: 24, weekday: 0 },
    { year: 2022, month: 0, day: 25, weekday: 1 },
    { year: 2022, month: 0, day: 26, weekday: 2 },
    { year: 2022, month: 0, day: 27, weekday: 3 },
    { year: 2022, month: 0, day: 28, weekday: 4 },
    { year: 2022, month: 0, day: 29, weekday: 5 },
    { year: 2022, month: 0, day: 30, weekday: 6 },
    { year: 2022, month: 0, day: 31, weekday: 0 }
  ])

  t.deepEqual(monthDays({ year: 2022, month: 1 }).map(toJson), [
    { year: 2022, month: 1, day: 1, weekday: 1 },
    { year: 2022, month: 1, day: 2, weekday: 2 },
    { year: 2022, month: 1, day: 3, weekday: 3 },
    { year: 2022, month: 1, day: 4, weekday: 4 },
    { year: 2022, month: 1, day: 5, weekday: 5 },
    { year: 2022, month: 1, day: 6, weekday: 6 },
    { year: 2022, month: 1, day: 7, weekday: 0 },
    { year: 2022, month: 1, day: 8, weekday: 1 },
    { year: 2022, month: 1, day: 9, weekday: 2 },
    { year: 2022, month: 1, day: 10, weekday: 3 },
    { year: 2022, month: 1, day: 11, weekday: 4 },
    { year: 2022, month: 1, day: 12, weekday: 5 },
    { year: 2022, month: 1, day: 13, weekday: 6 },
    { year: 2022, month: 1, day: 14, weekday: 0 },
    { year: 2022, month: 1, day: 15, weekday: 1 },
    { year: 2022, month: 1, day: 16, weekday: 2 },
    { year: 2022, month: 1, day: 17, weekday: 3 },
    { year: 2022, month: 1, day: 18, weekday: 4 },
    { year: 2022, month: 1, day: 19, weekday: 5 },
    { year: 2022, month: 1, day: 20, weekday: 6 },
    { year: 2022, month: 1, day: 21, weekday: 0 },
    { year: 2022, month: 1, day: 22, weekday: 1 },
    { year: 2022, month: 1, day: 23, weekday: 2 },
    { year: 2022, month: 1, day: 24, weekday: 3 },
    { year: 2022, month: 1, day: 25, weekday: 4 },
    { year: 2022, month: 1, day: 26, weekday: 5 },
    { year: 2022, month: 1, day: 27, weekday: 6 },
    { year: 2022, month: 1, day: 28, weekday: 0 }
  ])

  t.deepEqual(monthDays({ year: 2020, month: 1 }).map(toJson), [
    { year: 2020, month: 1, day: 1, weekday: 5 },
    { year: 2020, month: 1, day: 2, weekday: 6 },
    { year: 2020, month: 1, day: 3, weekday: 0 },
    { year: 2020, month: 1, day: 4, weekday: 1 },
    { year: 2020, month: 1, day: 5, weekday: 2 },
    { year: 2020, month: 1, day: 6, weekday: 3 },
    { year: 2020, month: 1, day: 7, weekday: 4 },
    { year: 2020, month: 1, day: 8, weekday: 5 },
    { year: 2020, month: 1, day: 9, weekday: 6 },
    { year: 2020, month: 1, day: 10, weekday: 0 },
    { year: 2020, month: 1, day: 11, weekday: 1 },
    { year: 2020, month: 1, day: 12, weekday: 2 },
    { year: 2020, month: 1, day: 13, weekday: 3 },
    { year: 2020, month: 1, day: 14, weekday: 4 },
    { year: 2020, month: 1, day: 15, weekday: 5 },
    { year: 2020, month: 1, day: 16, weekday: 6 },
    { year: 2020, month: 1, day: 17, weekday: 0 },
    { year: 2020, month: 1, day: 18, weekday: 1 },
    { year: 2020, month: 1, day: 19, weekday: 2 },
    { year: 2020, month: 1, day: 20, weekday: 3 },
    { year: 2020, month: 1, day: 21, weekday: 4 },
    { year: 2020, month: 1, day: 22, weekday: 5 },
    { year: 2020, month: 1, day: 23, weekday: 6 },
    { year: 2020, month: 1, day: 24, weekday: 0 },
    { year: 2020, month: 1, day: 25, weekday: 1 },
    { year: 2020, month: 1, day: 26, weekday: 2 },
    { year: 2020, month: 1, day: 27, weekday: 3 },
    { year: 2020, month: 1, day: 28, weekday: 4 },
    { year: 2020, month: 1, day: 29, weekday: 5 }
  ])

  t.deepEqual(monthDays({ year: 2022, month: 5 }).map(toJson), [
    { year: 2022, month: 5, day: 1, weekday: 2 },
    { year: 2022, month: 5, day: 2, weekday: 3 },
    { year: 2022, month: 5, day: 3, weekday: 4 },
    { year: 2022, month: 5, day: 4, weekday: 5 },
    { year: 2022, month: 5, day: 5, weekday: 6 },
    { year: 2022, month: 5, day: 6, weekday: 0 },
    { year: 2022, month: 5, day: 7, weekday: 1 },
    { year: 2022, month: 5, day: 8, weekday: 2 },
    { year: 2022, month: 5, day: 9, weekday: 3 },
    { year: 2022, month: 5, day: 10, weekday: 4 },
    { year: 2022, month: 5, day: 11, weekday: 5 },
    { year: 2022, month: 5, day: 12, weekday: 6 },
    { year: 2022, month: 5, day: 13, weekday: 0 },
    { year: 2022, month: 5, day: 14, weekday: 1 },
    { year: 2022, month: 5, day: 15, weekday: 2 },
    { year: 2022, month: 5, day: 16, weekday: 3 },
    { year: 2022, month: 5, day: 17, weekday: 4 },
    { year: 2022, month: 5, day: 18, weekday: 5 },
    { year: 2022, month: 5, day: 19, weekday: 6 },
    { year: 2022, month: 5, day: 20, weekday: 0 },
    { year: 2022, month: 5, day: 21, weekday: 1 },
    { year: 2022, month: 5, day: 22, weekday: 2 },
    { year: 2022, month: 5, day: 23, weekday: 3 },
    { year: 2022, month: 5, day: 24, weekday: 4 },
    { year: 2022, month: 5, day: 25, weekday: 5 },
    { year: 2022, month: 5, day: 26, weekday: 6 },
    { year: 2022, month: 5, day: 27, weekday: 0 },
    { year: 2022, month: 5, day: 28, weekday: 1 },
    { year: 2022, month: 5, day: 29, weekday: 2 },
    { year: 2022, month: 5, day: 30, weekday: 3 }
  ])
})
