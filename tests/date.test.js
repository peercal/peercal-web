const test = require('ava')
const { getCurrentWeeks } = require('../lib/date.js')

test('getCurrentWeeks()', t => {
  t.true(Array.isArray(getCurrentWeeks(2000, 1)))

  const jan2022 = getCurrentWeeks(2022, 0)
  t.deepEqual(
    jan2022,
    [
      [
        { year: 2021, month: 11, day: 27 },
        { year: 2021, month: 11, day: 28 },
        { year: 2021, month: 11, day: 29 },
        { year: 2021, month: 11, day: 30 },
        { year: 2021, month: 11, day: 31 },
        { year: 2022, month: 0, day: 1 },
        { year: 2022, month: 0, day: 2 }
      ],
      [
        { year: 2022, month: 0, day: 3 },
        { year: 2022, month: 0, day: 4 },
        { year: 2022, month: 0, day: 5 },
        { year: 2022, month: 0, day: 6 },
        { year: 2022, month: 0, day: 7 },
        { year: 2022, month: 0, day: 8 },
        { year: 2022, month: 0, day: 9 }
      ],
      [
        { year: 2022, month: 0, day: 10 },
        { year: 2022, month: 0, day: 11 },
        { year: 2022, month: 0, day: 12 },
        { year: 2022, month: 0, day: 13 },
        { year: 2022, month: 0, day: 14 },
        { year: 2022, month: 0, day: 15 },
        { year: 2022, month: 0, day: 16 }
      ],
      [
        { year: 2022, month: 0, day: 17 },
        { year: 2022, month: 0, day: 18 },
        { year: 2022, month: 0, day: 19 },
        { year: 2022, month: 0, day: 20 },
        { year: 2022, month: 0, day: 21 },
        { year: 2022, month: 0, day: 22 },
        { year: 2022, month: 0, day: 23 }
      ],
      [
        { year: 2022, month: 0, day: 24 },
        { year: 2022, month: 0, day: 25 },
        { year: 2022, month: 0, day: 26 },
        { year: 2022, month: 0, day: 27 },
        { year: 2022, month: 0, day: 28 },
        { year: 2022, month: 0, day: 29 },
        { year: 2022, month: 0, day: 30 }
      ],
      [
        { year: 2022, month: 0, day: 31 },
        { year: 2022, month: 1, day: 1 },
        { year: 2022, month: 1, day: 2 },
        { year: 2022, month: 1, day: 3 },
        { year: 2022, month: 1, day: 4 },
        { year: 2022, month: 1, day: 5 },
        { year: 2022, month: 1, day: 6 }
      ]
    ]
  )

  const feb2022 = getCurrentWeeks(2022, 1)
  t.deepEqual(
    feb2022,
    [
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
  )

  const may2022 = getCurrentWeeks(2022, 4)
  t.deepEqual(
    may2022,
    [
      [
        { year: 2022, month: 3, day: 25 },
        { year: 2022, month: 3, day: 26 },
        { year: 2022, month: 3, day: 27 },
        { year: 2022, month: 3, day: 28 },
        { year: 2022, month: 3, day: 29 },
        { year: 2022, month: 3, day: 30 },
        { year: 2022, month: 4, day: 1 }
      ],
      [
        { year: 2022, month: 4, day: 2 },
        { year: 2022, month: 4, day: 3 },
        { year: 2022, month: 4, day: 4 },
        { year: 2022, month: 4, day: 5 },
        { year: 2022, month: 4, day: 6 },
        { year: 2022, month: 4, day: 7 },
        { year: 2022, month: 4, day: 8 }
      ],
      [
        { year: 2022, month: 4, day: 9 },
        { year: 2022, month: 4, day: 10 },
        { year: 2022, month: 4, day: 11 },
        { year: 2022, month: 4, day: 12 },
        { year: 2022, month: 4, day: 13 },
        { year: 2022, month: 4, day: 14 },
        { year: 2022, month: 4, day: 15 }
      ],
      [
        { year: 2022, month: 4, day: 16 },
        { year: 2022, month: 4, day: 17 },
        { year: 2022, month: 4, day: 18 },
        { year: 2022, month: 4, day: 19 },
        { year: 2022, month: 4, day: 20 },
        { year: 2022, month: 4, day: 21 },
        { year: 2022, month: 4, day: 22 }
      ],
      [
        { year: 2022, month: 4, day: 23 },
        { year: 2022, month: 4, day: 24 },
        { year: 2022, month: 4, day: 25 },
        { year: 2022, month: 4, day: 26 },
        { year: 2022, month: 4, day: 27 },
        { year: 2022, month: 4, day: 28 },
        { year: 2022, month: 4, day: 29 }
      ],
      [
        { year: 2022, month: 4, day: 30 },
        { year: 2022, month: 4, day: 31 },
        { year: 2022, month: 5, day: 1 },
        { year: 2022, month: 5, day: 2 },
        { year: 2022, month: 5, day: 3 },
        { year: 2022, month: 5, day: 4 },
        { year: 2022, month: 5, day: 5 }
      ]
    ]
  )

  const jun2022 = getCurrentWeeks(2022, 5)
  t.deepEqual(
    jun2022,
    [
      [
        { year: 2022, month: 4, day: 30 },
        { year: 2022, month: 4, day: 31 },
        { year: 2022, month: 5, day: 1 },
        { year: 2022, month: 5, day: 2 },
        { year: 2022, month: 5, day: 3 },
        { year: 2022, month: 5, day: 4 },
        { year: 2022, month: 5, day: 5 }
      ],
      [
        { year: 2022, month: 5, day: 6 },
        { year: 2022, month: 5, day: 7 },
        { year: 2022, month: 5, day: 8 },
        { year: 2022, month: 5, day: 9 },
        { year: 2022, month: 5, day: 10 },
        { year: 2022, month: 5, day: 11 },
        { year: 2022, month: 5, day: 12 }
      ],
      [
        { year: 2022, month: 5, day: 13 },
        { year: 2022, month: 5, day: 14 },
        { year: 2022, month: 5, day: 15 },
        { year: 2022, month: 5, day: 16 },
        { year: 2022, month: 5, day: 17 },
        { year: 2022, month: 5, day: 18 },
        { year: 2022, month: 5, day: 19 }
      ],
      [
        { year: 2022, month: 5, day: 20 },
        { year: 2022, month: 5, day: 21 },
        { year: 2022, month: 5, day: 22 },
        { year: 2022, month: 5, day: 23 },
        { year: 2022, month: 5, day: 24 },
        { year: 2022, month: 5, day: 25 },
        { year: 2022, month: 5, day: 26 }
      ],
      [
        { year: 2022, month: 5, day: 27 },
        { year: 2022, month: 5, day: 28 },
        { year: 2022, month: 5, day: 29 },
        { year: 2022, month: 5, day: 30 },
        { year: 2022, month: 6, day: 1 },
        { year: 2022, month: 6, day: 2 },
        { year: 2022, month: 6, day: 3 }
      ]
    ]
  )
})
