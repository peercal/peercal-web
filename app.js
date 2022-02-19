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
const HyperdriveWatcher = require('./lib/hyperdrive-watcher.js')

const ToolbarView = require('./components/toolbar.js')
const HeaderView = require('./components/header.js')
const MonthlyView = require('./components/monthly.js')

app.use((state, emitter) => {
  let lastDate = new Date()

  state.events = []

  function eventsFileWatcher ({ url, data }) {
    console.log('events updated from url', url)
    state.events = parseEvents(data)
    emitter.emit('render')
  }

  // TODO hardcoded events for now
  const url = 'hyper://0aa6537ae8f41113c583d725305944f00281968b0d23051804361a3436ea4e38/events.ics'
  HyperdriveWatcher(url, eventsFileWatcher)

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
