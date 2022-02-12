const test = require('ava')
const { parseIcs } = require('../lib/ics.js')

test('parsing ics string to vcalendar object', t => {
  const vcal = parseIcs(DATA)
  t.truthy(Array.isArray(vcal.components))
  t.is(vcal.components.length, 4)
  vcal.components.forEach(component => {
    t.is(component.type, 'VEVENT')
    t.is(typeof component.DTSTART, 'string')
    t.is(typeof component.DTEND, 'string')
    t.is(typeof component.SUMMARY, 'string')
    t.is(typeof component.DESCRIPTION, 'string')
  })
})

const DATA = `
BEGIN:VCALENDAR
PRODID:-//Foobar GmbH
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH

BEGIN:VEVENT
DTSTART:20211013T050000Z
DTEND:20211013T080000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Watch amazing movie "Kong vs Godzilla"
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20211025T040000Z
DTEND:20211025T043000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633981081958@example.com
SEQUENCE:1
SUMMARY:3D-printing
DESCRIPTION:<div dir="auto">Obviously we can put html in here as well. The question is if we should render it or not.</div>
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220108T150000Z
DTEND:20220108T180000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21641477558250@example.com
SEQUENCE:2
SUMMARY:3D-modelling workshop
DESCRIPTION:<div dir="auto">At the last workshop we installed freecad, so if you don't have it installed it can be a good idea to install it before the workshop.<br></div><div dir="auto">Ending time is approximate.&nbsp</div><div dir="auto"><a href="https://www.freecadweb.org/" rel="noopener noreferrer" target="_blank">https://www.freecadweb.org/</a><br></div><div dir="auto"><br></div>
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220129T170000Z
DTEND:20220129T200000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21642798024486@example.com
SEQUENCE:3
SUMMARY:3D-printing workshop
DESCRIPTION:<div dir="auto">Were going to try to 3D-print or at least model an idea that Godogg has for his car.&nbsp<br></div><div dir="auto">We're using freecad - its fine to come if you haven't been to the other workshops, but you might want to install freecad ahead of time.&nbsp<br></div><div dir="auto">Welcome!&nbsp<br></div><div dir="auto"><br></div>
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

END:VCALENDAR
`
