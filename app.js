const choo = require('choo')
const html = require('choo/html')
const config = require('./config.json')

const ToolbarController = require('./controllers/toolbar.js')
const MonthlyController = require('./controllers/monthly.js')
const WeeklyController = require('./controllers/weekly.js')
const DailyController = require('./controllers/daily.js')
const EventController = require('./controllers/event.js')
const DateChangeController = require('./controllers/date-changed.js')
const FeedsController = require('./controllers/feeds.js')
const TouchController = require('./controllers/touch.js')

const MonthlyView = require('./views/monthly.js')
const WeeklyView = require('./views/weekly.js')
const DailyView = require('./views/daily.js')
const EventView = require('./views/event.js')

const app = choo()

app.use((state, emitter) => {
  state.allEvents = []
})

app.use(ToolbarController)
app.use(MonthlyController)
app.use(WeeklyController)
app.use(DailyController)
app.use(EventController)
app.use(DateChangeController)
app.use(FeedsController(config))
app.use(TouchController)

app.route('/', renderApp(MonthlyView))
app.route('/weekly', renderApp(WeeklyView))
app.route('/daily', renderApp(DailyView))
app.route('/event', renderApp(EventView))
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
        svg {
          fill: grey;
        }
        svg:hover {
          fill: white;
        }
        body {
          border: 0px solid green;
          min-height: 100vh;
          overflow: hidden;
          font-family: monospace;
          background: black;
          color: white;
        }
        a {
          text-decoration: none;
        }
        table {
          display: flex;
          position: absolute;
          top: 50px;
          bottom: 0;
          left: 0;
          right: 0;
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 10px;
        }
        tbody {
          width: 100%;
          display: flex;
          flex-direction: column;
          /* Firefox */
          scrollbar-width: thin;
          scrollbar-color: grey black;
        }
        /* Chrome, Edge, and Safari */
        tbody::-webkit-scrollbar {
          width: 3px;
        }
        /* Chrome, Edge, and Safari */
        tbody::-webkit-scrollbar-track {
          background: black;
        }
        /* Chrome, Edge, and Safari */
        tbody::-webkit-scrollbar-thumb {
          background-color: grey;
          border-radius: 20px;
        }
        th {
          border-right: 1px dashed grey;
          border-bottom: 1px dashed grey;
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
