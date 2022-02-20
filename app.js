const app = require('choo')()
const html = require('choo/html')
const css = require('sheetify')

const { WEEKDAYS, MONTHS } = require('./lib/date.js')

const MontlyController = require('./controllers/montly.js')
// const FeedsController = require('./controllers/feeds.js')
const DateChangeController = require('./controllers/date-changed.js')

const ToolbarView = require('./components/toolbar.js')
const MonthlyView = require('./components/monthly.js')

const MONTLY = 'montly'

app.use((state, emitter) => {
  state.mode = MONTLY
  state.allEvents = []
})

app.use(MontlyController)
app.use(DateChangeController)
// app.use(FeedsController)

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
