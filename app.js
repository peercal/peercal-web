const app = require('choo')()
const html = require('choo/html')

const config = require('./config.json')
const {
  MODE_MONTHLY,
  MODE_WEEKLY,
  MODE_DAILY
} = require('./modes.js')

const MontlyController = require('./controllers/montly.js')
const WeeklyController = require('./controllers/weekly.js')
const DateChangeController = require('./controllers/date-changed.js')
const FeedsController = require('./controllers/feeds.js')
const SwipeController = require('./controllers/swipe.js')

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
})

app.use(MontlyController)
app.use(WeeklyController)
app.use(DateChangeController)
app.use(FeedsController(config))
app.use(SwipeController)

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
    </style>
    ${View(state, emit)}
  </body>`
})

app.mount(document.body)
