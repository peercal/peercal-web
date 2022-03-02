const {
  startOfDay,
  endOfDay
} = require('./date.js')
const VEVENT_PROPS = [
  'DTSTART',
  'DTEND',
  'SUMMARY',
  'DESCRIPTION',
  'UID'
]

const DATE_PROPS = [
  'DTSTART',
  'DTEND'
]

/**
 *
 */
class VEvent {
  constructor () {
    this._dtstart = null
    this._dtend = null
    this._summary = ''
    this._uid = ''
    this._description = ''
  }

  // TODO getters?

  start () {
    return this._dtstart
  }

  end () {
    return this._dtend
  }

  summary () {
    return this._summary
  }

  uid () {
    return this._uid
  }

  description () {
    return this._description
  }

  parseRow (row) {
    const [key, value, ...rest] = row.split(':')
    if (VEVENT_PROPS.includes(key)) {
      const _key = `_${key.toLowerCase()}`
      if (DATE_PROPS.includes(key)) {
        this[_key] = parseIcsDate(value.trim())
      } else {
        this[_key] = value.concat(rest)
      }
    }
  }

  isValid () {
    return isValidDate(this.start()) && isValidDate(this.end())
  }
}

/**
 * Validate date
 */
function isValidDate (date) {
  return date instanceof Date && !isNaN(date.valueOf())
}

/**
 * Parse an ics data string into a vcalendar object.
 */
function parseEvents (data) {
  const events = []

  let event = null
  for (const row of data.split('\n').filter(Boolean)) {
    if (!event && row.toUpperCase().startsWith('BEGIN:VEVENT')) {
      event = new VEvent()
    } else if (event) {
      if (row.toUpperCase().startsWith('END:VEVENT')) {
        if (event.isValid()) {
          events.push(event)
        } else {
          console.error('invalid event', event)
        }
        event = null
      } else {
        event.parseRow(row)
      }
    }
  }

  return events
}

/**
 * Filter out events intersecting a particular date
 */
function filterEventsFromDate (events, date) {
  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)
  return events.filter(event => {
    try {
      return !(event.start() > dayEnd || dayStart > event.end())
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
    return !(event.start() > endOfDay(date) || startOfDay(date) > event.end())
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
  hasEvent
}
