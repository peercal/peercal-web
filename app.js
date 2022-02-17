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

const ToolbarView = require('./components/toolbar.js')
const HeaderView = require('./components/header.js')
const MonthlyView = require('./components/monthly.js')

app.use((state, emitter) => {
  let lastDate = new Date()

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
  const { year, month, selected, weeks } = state.monthly
  return html`<body class=${body}>
    <div class=${calendar}>
      ${ToolbarView({ year, month: MONTHS[month] }, emit)}
      ${HeaderView({ weekdays: WEEKDAYS })}
      ${MonthlyView({ month, weeks, selected }, emit)}
    </div>
  </body>`
})

app.mount(document.body)
