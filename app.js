const app = require('choo')()
const html = require('choo/html')
const config = require('./config.json')
const MonthlyController = require('./controllers/monthly.js')
const WeeklyController = require('./controllers/weekly.js')
const DateChangeController = require('./controllers/date-changed.js')
const FeedsController = require('./controllers/feeds.js')
const TouchController = require('./controllers/touch.js')
const MonthlyView = require('./views/monthly.js')
const WeeklyView = require('./views/weekly.js')
const DailyView = require('./views/daily.js')

app.use((state, emitter) => {
  state.allEvents = []
})

app.use(MonthlyController)
app.use(WeeklyController)
app.use(DateChangeController)
app.use(FeedsController(config))
app.use(TouchController)

app.route('/', renderApp(MonthlyView))
app.route('/weekly', renderApp(WeeklyView))
app.route('/daily', renderApp(DailyView))
app.route('/404', notFound)
app.route('/*', notFound)

function renderApp (View) {
  return function (state, emit) {
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
  }
}

app.mount(document.body)

function notFound () {
  return html`
    <body>
      <a href="/">
        Route not found. Navigate back.
      </a>
    </body>
  `
}
