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

const toolbar = require('./components/toolbar.js')
const header = require('./components/header.js')
const monthly = require('./components/monthly.js')

app.use((state, emitter) => {
  let lastDate = new Date()

  function setMonth (opts) {
    state.monthly = opts
    state.monthly.monthWeeks = daysToWeeks(monthDaysFilled(opts))
  }

  function setCurrentMonth () {
    const now = new Date()
    setMonth({ year: now.getFullYear(), month: now.getMonth() })
  }

  emitter.on('month:prev', () => {
    setMonth(previousMonth(state.monthly))
    emitter.emit('render')
  })
  emitter.on('month:home', () => {
    setCurrentMonth()
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
    setMonth(nextMonth(state.monthly))
    emitter.emit('render')
  })

  // Re-render if the day has changed.
  setInterval(() => {
    const date = new Date()
    if (date.getDate() !== lastDate.getDate()) {
      lastDate = date
      emitter.emit('render')
    }
  }, 60 * 1000)

  setCurrentMonth()
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
  const { year, month, monthWeeks } = state.monthly
  return html`<body class=${body}>
    <div class=${calendar}>
      ${toolbar({ year, month: MONTHS[month] }, emit)}
      ${header({ weekdays: WEEKDAYS })}
      ${monthly({ month, monthWeeks })}
    </div>
  </body>`
})

app.mount(document.body)
