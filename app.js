const app = require('choo')()
const html = require('choo/html')

const config = require('./config.json')
const {
  MODE_MONTHLY,
  MODE_WEEKLY,
  MODE_DAILY
} = require('./modes.js')

const MonthlyController = require('./controllers/monthly.js')
const WeeklyController = require('./controllers/weekly.js')
const DateChangeController = require('./controllers/date-changed.js')
const FeedsController = require('./controllers/feeds.js')
const TouchController = require('./controllers/touch.js')

const MonthlyView = require('./components/monthly.js')
const WeeklyView = require('./components/weekly.js')
const DailyView = require('./components/daily.js')

app.use((state, emitter) => {
  state.allEvents = []
  state.mode = MODE_MONTHLY
  // state.mode = MODE_WEEKLY

  emitter.on('toolbar:set-mode', (mode) => {
    state.mode = mode
    emitter.emit('render')
  })
  emitter.on('touch:longpress:week', (date) => {
    state.mode = MODE_WEEKLY
    emitter.emit('render')
  })
  emitter.on('touch:longpress:date', (date) => {
    console.log('TODO set daily mode for date', date)
  })
})

app.use(MonthlyController)
app.use(WeeklyController)
app.use(DateChangeController)
app.use(FeedsController(config))
app.use(TouchController)

function getView ({ mode }) {
  switch (mode) {
    case MODE_MONTHLY:
      return MonthlyView
    case MODE_WEEKLY:
      return WeeklyView
    case MODE_DAILY:
      return DailyView
    default:
      return () => html`<div>Unknown view mode</div>`
  }
}

// TODO add routes for different modes
app.route('*', (state, emit) => {
  const View = getView(state)
  // TODO hardcoded colors for now -> should use theme
  return html`<body>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        border: 0px solid green;
        min-height: 100vh;
        overflow: hidden;
        font-family: monospace;
        background: black;
        color: white;
      }
      tbody {
        width: 100%;
        border: 1px solid red;
        display: flex;
        flex-direction: column;
      }
      th {
        border-right: 1px solid red;
        border-bottom: 1px solid red;
      }
      th:last-child, td:last-child {
        border-right: 0px;
      }
      td {
        border-right: 1px dashed grey;
        border-bottom: 1px dashed grey;
      }
      tr:last-child td {
        border-bottom: 0px;
      }
    </style>
    ${View(state, emit)}
  </body>`
})

app.mount(document.body)
