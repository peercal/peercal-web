const app = require('choo')()
const html = require('choo/html')
const css = require('sheetify')

const { parseEvents } = require('./lib/ics.js')
const {
  WEEKDAYS,
  MONTHS,
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
} = require('./lib/date.js')

const ToolbarView = require('./components/toolbar.js')
const HeaderView = require('./components/header.js')
const MonthlyView = require('./components/monthly.js')

const HyperdriveWatcher = require('./hyperdrive-watcher.js')
function eventsFileWatcher ({ url, data }) {
  console.log('UPDATE from url', url)
  console.log(data)
}

const url1 = 'hyper://0aa6537ae8f41113c583d725305944f00281968b0d23051804361a3436ea4e38/events.ics'
HyperdriveWatcher(url1, eventsFileWatcher)
const url2 = 'hyper://3fe48c75e45aae82ef90cf29027f78fa821eb35c247e7e80dae6dba5105f5909/events.ics'
HyperdriveWatcher(url2, eventsFileWatcher)

app.use((state, emitter) => {
  let lastDate = new Date()

  // TODO hardcoded event data for now
  state.events = parseEvents(EVENT_DATA)

  function setMonthly (monthly) {
    state.monthly = monthly
    state.monthly.weeks = daysToWeeks(monthDaysFilled(monthly))
    emitter.emit('render')
  }

  function setToday () {
    const today = new Date()
    setMonthly({
      year: today.getFullYear(),
      month: today.getMonth(),
      selected: today
    })
  }

  emitter.on('monthly:goto-previous', () => setMonthly(previousMonth(state.monthly)))
  emitter.on('monthly:goto-home', () => setToday())
  emitter.on('monthly:goto-next', () => setMonthly(nextMonth(state.monthly)))
  emitter.on('monthly:select-date', (date) => {
    state.monthly.selected = date
    emitter.emit('render')
  })

  function moveSelected (offset) {
    const { selected } = state.monthly
    const update = new Date(selected)
    update.setDate(selected.getDate() + offset)
    setMonthly({
      year: update.getFullYear(),
      month: update.getMonth(),
      selected: update
    })
  }

  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        moveSelected(-1)
        break
      case 'ArrowRight':
        moveSelected(+1)
        break
      case 'ArrowUp':
        moveSelected(-7)
        break
      case 'ArrowDown':
        moveSelected(+7)
        break
    }
  })

  // Re-render if the day has changed.
  setInterval(() => {
    const date = new Date()
    if (date.getDate() !== lastDate.getDate()) {
      lastDate = date
      emitter.emit('render')
    }
  }, 60 * 1000)

  setToday()
})

const body = css`
  :host {
    height: 100%;
    margin: 0px;
    overflow: hidden;
    font-family: monospace;
    background: black;
    color: white;
    font-size: 14px;
  }
`

const calendar = css`
  :host {
    position: absolute;
    top: 30px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    color: white;
  }
`

app.route('*', (state, emit) => {
  const { events, monthly } = state
  const { year, month, selected, weeks } = monthly
  return html`<body class=${body}>
    <div class=${calendar}>
      ${ToolbarView({ year, month: MONTHS[month] }, emit)}
      ${HeaderView({ weekdays: WEEKDAYS })}
      ${MonthlyView({ month, weeks, selected, events }, emit)}
    </div>
  </body>`
})

app.mount(document.body)

const EVENT_DATA = `
BEGIN:VCALENDAR
PRODID:-//Foobar GmbH
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH

BEGIN:VEVENT
DTSTART:20220110T050000Z
DTEND:20220120T080000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:JANUARY, woohoo!
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220131T050000Z
DTEND:20220131T080000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Watch amazing movie "Kong vs Godzilla"
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220201T050000Z
DTEND:20220201T080000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Watch another movie...
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220201T100000Z
DTEND:20220201T120000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Dinner at the local pizzeria, yummy!
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T100000Z
DTEND:20220216T120000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Another very important event
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T110000Z
DTEND:20220216T130000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T130000Z
DTEND:20220216T140000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T140000Z
DTEND:20220216T150000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T150000Z
DTEND:20220216T160000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T160000Z
DTEND:20220216T170000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T160000Z
DTEND:20220216T170000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T160000Z
DTEND:20220216T170000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T160000Z
DTEND:20220216T170000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:A lot happening this day it seems
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220216T170000Z
DTEND:20220216T180000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Lets end this evening with some fun
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220219T122500Z
DTEND:20220226T120000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Trip to Hawaii?
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

BEGIN:VEVENT
DTSTART:20220302T050800Z
DTEND:20220322T080000Z
DTSTAMP:20220205T165901Z
UID:MlN8btK----21633566522596@example.com
SEQUENCE:1
SUMMARY:Lets have a long event in March as well
DESCRIPTION:The description field should be a longer text describing the event in more details.
ORGANIZER;EMAIL=linkping@example.com:mailto:linkping@example.com
END:VEVENT

END:VCALENDAR
`
