const VEVENT_PROPS = [
  'DTSTART',
  'DTEND',
  'DTSTAMP',
  'SUMMARY',
  'DESCRIPTION'
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
        events.push(event)
        event = null
      } else {
        const [key, value, ...rest] = row.split(':')
        if (VEVENT_PROPS.includes(key)) {
          event[key] = value.concat(rest)
        }
      }
    }
  }

  return events
}

/**
 * Filter out events intersecting a particular date
 */
function filterEvents (events, d) {
  const dayStart = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0)
  const dayEnd = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59)
  return events.filter(event => {
    try {
      const start = parseIcsDate(event.DTSTART)
      const end = parseIcsDate(event.DTEND)
      return !(start > dayEnd || dayStart > end)
    } catch (e) {
      console.error(e.message)
      return false
    }
  })
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

  return Date.UTC(year, month - 1, day, hour, minute, second)
}

module.exports = {
  parseEvents,
  filterEvents
}
