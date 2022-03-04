const test = require('ava')
const fs = require('fs')
const {
  VEvent,
  parseEvents,
  filterEventsFromDate
} = require('../lib/ics.js')

const DATA = fs.readFileSync('./tests/events.ics', 'utf-8')

test('VEvent class, empty constructor', t => {
  const event = new VEvent()
  t.deepEqual(event._opts, {})
  t.is(event.readOnly, false)
  t.is(event._event.dtstart, null)
  t.is(event._event.dtend, null)
  t.is(event._event.summary, '')
  t.is(event._event.uid, '')
  t.is(event._event.description, '')
  t.falsy(event.isValid())
})

test('VEvent class, with options', t => {
  const opts = { url: 'u', background: 'b', color: 'c', readOnly: false }
  const event = new VEvent(opts)
  t.is(event.readOnly, false)
  t.deepEqual(event._opts, opts)
})

test('parsing ics string to event array', t => {
  const events = parseEvents(DATA)
  t.truthy(Array.isArray(events))
  t.is(events.length, 7)
  events.forEach(event => {
    t.truthy(event.start instanceof Date)
    t.truthy(event.end instanceof Date)
    t.is(typeof event.summary, 'string')
    t.is(typeof event.description, 'string')
    t.is(typeof event.uid, 'string')
  })
})

test('filtering events', t => {
  const events = parseEvents(DATA)

  t.is(filterEventsFromDate(events, new Date('2022-02-27')).length, 0)

  t.is(filterEventsFromDate(events, new Date('2021-10-13')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2021-10-25')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-01-08')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-01-29')).length, 2)

  t.is(filterEventsFromDate(events, new Date('2022-02-19')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-20')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-21')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-22')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-23')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-24')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-25')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-02-26')).length, 1)

  t.is(filterEventsFromDate(events, new Date('2022-02-28')).length, 0)
  t.is(filterEventsFromDate(events, new Date('2022-03-01')).length, 1)
  t.is(filterEventsFromDate(events, new Date('2022-03-02')).length, 0)
  t.is(filterEventsFromDate(events, new Date('2022-03-03')).length, 0)
})
