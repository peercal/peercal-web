const app = require('choo')()
const html = require('choo/html')
const css = require('sheetify')

const {
  WEEKDAYS,
  MONTHS,
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
} = require('./lib/date.js')

const FeedsController = require('./controllers/feeds.js')
const DateChangeController = require('./controllers/date-changed.js')

const ToolbarView = require('./components/toolbar.js')
const MonthlyView = require('./components/monthly.js')

const MONTLY = 'montly'

app.use((state, emitter) => {
  state.mode = MONTLY
  state.allEvents = []
})

app.use(FeedsController)

app.use((state, emitter) => {
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

  emitter.on('toolbar:goto-previous', () => {
    if (state.mode === MONTLY) {
      setMonthly(previousMonth(state.monthly))
    }
  })
  emitter.on('toolbar:goto-home', () => {
    if (state.mode === MONTLY) {
      setToday()
    }
  })
  emitter.on('toolbar:goto-next', () => {
    if (state.mode === MONTLY) {
      setMonthly(nextMonth(state.monthly))
    }
  })

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

  setToday()
})

app.use(DateChangeController)

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
