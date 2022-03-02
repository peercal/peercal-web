const {
  startOfDay,
  endOfDay
} = require('./date.js')
const VEVENT_PROPS = [
  'DTSTART',
  'DTEND',
  'DTSTAMP',
  'SUMMARY',
  'DESCRIPTION',
  'UID'
]

const DATE_PROPS = [
  'DTSTART',
  'DTEND',
  'DTSTAMP'
]

/**
 * Parse an ics data string into a vcalendar object.
 */
function parseEvents (data) {
  const events = []

  let event = null
  for (const row of data.split('\n').filter(Boolean)) {
    if (!event && row.startsWith('BEGIN:VEVENT')) {
      event = {}
    } else if (event) {
      if (row.startsWith('END:VEVENT')) {
        if (isValidEvent(event)) {
          events.push(event)
        } else {
          console.error('invalid event', event)
        }
        event = null
      } else {
        const [key, value, ...rest] = row.split(':')
        if (VEVENT_PROPS.includes(key)) {
          if (DATE_PROPS.includes(key)) {
            event[key] = parseIcsDate(value.trim())
          } else {
            event[key] = value.concat(rest)
          }
        }
      }
    }
  }

  return events
}

/**
 * Validate event
 */
function isValidEvent (event) {
  if (event) {
    return isValidDate(event.DTSTART) && isValidDate(event.DTEND)
  } else {
    return false
  }
}

/**
 * Validate date
 */
function isValidDate (date) {
  return date instanceof Date && !isNaN(date.valueOf())
}

/**
 * Filter out events intersecting a particular date
 */
function filterEventsFromDate (events, date) {
  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)
  return events.filter(event => {
    try {
      return !(event.DTSTART > dayEnd || dayStart > event.DTEND)
    } catch (e) {
      console.error(e.message)
      return false
    }
  })
}

/**
 * Returns true if a date intersects an event
 */
function hasEvent (date, event) {
  try {
    return !(event.DTSTART > endOfDay(date) || startOfDay(date) > event.DTEND)
  } catch (e) {
    console.error(e.message)
    return false
  }
}

/**
 * Convert ics date string to UTC timestamp
 */
function parseIcsDate (icsDate) {
  if (!/^[0-9]{8}T[0-9]{6}Z$/.test(icsDate)) {
    throw new Error(`incorrect ics format ${icsDate}`)
  }

  const year = icsDate.substr(0, 4)
  const month = icsDate.substr(4, 2)
  const day = icsDate.substr(6, 2)
  const hour = icsDate.substr(9, 2)
  const minute = icsDate.substr(11, 2)
  const second = icsDate.substr(13, 2)

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second))
}

module.exports = {
  parseEvents,
  filterEventsFromDate,
  hasEvent,
  isValidEvent,
  isValidDate
}
