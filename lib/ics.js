const VEVENT_PROPS = [
  'DTSTART',
  'DTEND',
  'DTSTAMP',
  'SUMMARY',
  'DESCRIPTION'
]

/**
 * Parse an ics data string into a vcalendar object.
 * NOTE only handling VEVENT for now.
 */
function parseIcs (data) {
  const rows = data.split('\n').filter(Boolean)
  const vcal = { components: [] }

  let component = null
  for (const row of rows) {
    if (!component && row.startsWith('BEGIN:VEVENT')) {
      component = { type: 'VEVENT' }
    } else if (component) {
      if (row.startsWith('END:VEVENT')) {
        vcal.components.push(component)
        component = null
      } else {
        const [key, value, ...rest] = row.split(':')
        if (VEVENT_PROPS.includes(key)) {
          component[key] = value.concat(rest)
        }
      }
    }
  }

  return vcal
}

module.exports = { parseIcs }
