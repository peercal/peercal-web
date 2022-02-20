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
const MonthlyView = require('./components/monthly.js')

const MONTLY = 'montly'

app.use((state, emitter) => {
  let lastDate = new Date()

  state.mode = MONTLY
  state.feeds = new Map()
  state.allEvents = []

  function addReadableFeed (url, background, color) {
    console.log('adding feed', url)
    const watcher = HyperdriveWatcher(url, eventsFileWatcher)
    const feed = { events: [], watcher, background, color }
    state.feeds.set(url, feed)
  }

  function aggregateAllEvents () {
    let result = []
    for (const feed of state.feeds.values()) {
      const { background, color } = feed
      const events = feed.events.map(ev => {
        return { ...ev, background, color }
      })
      result = result.concat(events)
    }
    return result
  }

  function eventsFileWatcher ({ url, data }) {
    const feed = state.feeds.get(url)
    feed.events = parseEvents(data)
    state.allEvents = aggregateAllEvents()
    emitter.emit('render')
  }

  // TODO hardcoded events for now
  // TODO configure colors when adding feeds from the ui, with sane defaults
  addReadableFeed('hyper://0aa6537ae8f41113c583d725305944f00281968b0d23051804361a3436ea4e38/events.ics', 'white', 'black')
  addReadableFeed('hyper://3fe48c75e45aae82ef90cf29027f78fa821eb35c247e7e80dae6dba5105f5909/events.ics', 'blue', 'white')
  addReadableFeed('hyper://7805b255174ccf9e6e8af13ea71bcb9ad347a817984e94e189b1d45eb9fa88d1/events.ics', 'orange', 'black')

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
  const { allEvents: events, monthly, mode } = state
  if (mode === MONTLY) {
    const { year, month, selected, weeks } = monthly
    const title = `${year} ${MONTHS[month]}`
    return html`<body class=${body}>
      <div class=${calendar}>
        ${ToolbarView({ title }, emit)}
        ${MonthlyView({ month, weeks, selected, weekdays: WEEKDAYS, events }, emit)}
      </div>
    </body>`
  } else {
    return html`<body class=${body}>
      <div class=${calendar}>Unknown view mode</div>
    </body>`
  }
})

app.mount(document.body)
