const test = require('ava')
const { getCurrentWeeks } = require('../lib/date.js')

test('getCurrentWeeks()', t => {
  t.true(Array.isArray(getCurrentWeeks(2000, 1)))
  t.is(getCurrentWeeks(2000, 1).length, 5, 'we show 5 weeks')
})
