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

module.exports = { parseEvents }
