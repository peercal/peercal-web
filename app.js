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

  function setMonthly (date = new Date()) {
    state.monthly = { date }
    state.monthly.weeks = daysToWeeks(monthDaysFilled(date))
    emitter.emit('render')
  }

  function moveSelected (offset) {
    const { date } = state.monthly
    const update = new Date(date)
    update.setDate(date.getDate() + offset)
    setMonthly(update)
  }

  emitter.on('monthly:goto-previous', () => {
    setMonthly(previousMonth(state.monthly.date))
  })

  emitter.on('monthly:goto-home', () => {
    setMonthly()
  })

  emitter.on('monthly:goto-next', () => {
    setMonthly(nextMonth(state.monthly.date))
  })

  emitter.on('monthly:select-date', (date) => {
    setMonthly(date)
  })

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

  setMonthly()
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
  const { date, weeks } = state.monthly
  const year = date.getFullYear()
  return html`<body class=${body}>
    <div class=${calendar}>
      ${toolbar({ year, month: MONTHS[date.getMonth()] }, emit)}
      ${header({ weekdays: WEEKDAYS })}
      ${monthly({ weeks, date }, emit)}
    </div>
  </body>`
})

app.mount(document.body)
