const app = require('choo')()
const html = require('choo/html')
const css = require('sheetify')

const {
  MODE_MONTHLY,
  MODE_WEEKLY,
  MODE_DAILY
} = require('./modes.js')
const { WEEKDAYS, MONTHS } = require('./lib/date.js')

const MontlyController = require('./controllers/montly.js')
const WeeklyController = require('./controllers/weekly.js')
const DateChangeController = require('./controllers/date-changed.js')
const FeedsController = require('./controllers/feeds.js')

const ToolbarView = require('./components/toolbar.js')
const MonthlyView = require('./components/monthly.js')
const WeeklyView = require('./components/weekly.js')

app.use((state, emitter) => {
  state.allEvents = []
  // state.mode = MODE_MONTHLY
  state.mode = MODE_WEEKLY

  emitter.on('toolbar:set-mode', (mode) => {
    state.mode = mode
    emitter.emit('render')
  })
})

app.use(MontlyController)
app.use(WeeklyController)
app.use(DateChangeController)
app.use(FeedsController)

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
  // TODO allEvents should be re-filtered on each monthly and weekly state since we shouldn't
  // need to filter all events each time we render (optimization)
  const { allEvents, monthly, weekly, mode } = state
  if (mode === MODE_MONTHLY) {
    const { year, month, selected, weeks } = monthly
    const title = `${year} ${MONTHS[month]}`
    return html`<body class=${body}>
      <div class=${calendar}>
        ${ToolbarView({ title, mode }, emit)}
        ${MonthlyView({ month, weeks, selected, weekdays: WEEKDAYS, events: allEvents }, emit)}
      </div>
    </body>`
  } else if (mode === MODE_WEEKLY) {
    const { year, days, weekNumber } = weekly
    const title = `${year} WEEK ${weekNumber}`
    return html`<body class=${body}>
      <div class=${calendar}>
        ${ToolbarView({ title, mode }, emit)}
        ${WeeklyView({ days, weekNumber, events: allEvents }, emit)}
      </div>
    </body>`
  } else if (mode === MODE_DAILY) {
    const title = 'TODO daily'
    return html`<body class=${body}>
      <div class=${calendar}>
        ${ToolbarView({ title, mode }, emit)}
      </div>
    </body>`
  } else {
    return html`<body class=${body}>
      <div class=${calendar}>Unknown view mode</div>
    </body>`
  }
})

app.mount(document.body)
