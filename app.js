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
    state.monthly.weeks = daysToWeeks(monthDaysFilled(opts))
  }

  function setCurrentMonth (date = new Date()) {
    setMonth({
      year: date.getFullYear(),
      month: date.getMonth(),
      selected: date
    })
  }

  function moveSelected (offset) {
    const { selected } = state.monthly
    const update = new Date(selected)
    update.setDate(selected.getDate() + offset)
    setCurrentMonth(update)
    emitter.emit('render')
  }

  emitter.on('monthly:goto-previous', () => {
    setMonth(previousMonth(state.monthly))
    emitter.emit('render')
  })

  emitter.on('monthly:goto-home', () => {
    setCurrentMonth()
    emitter.emit('render')
  })

  emitter.on('monthly:goto-next', () => {
    setMonth(nextMonth(state.monthly))
    emitter.emit('render')
  })

  emitter.on('monthly:select-date', (date) => {
    state.monthly.selected = date
    emitter.emit('render')
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
  const { year, month, weeks, selected } = state.monthly
  return html`<body class=${body}>
    <div class=${calendar}>
      ${toolbar({ year, month: MONTHS[month] }, emit)}
      ${header({ weekdays: WEEKDAYS })}
      ${monthly({ month, weeks, selected }, emit)}
    </div>
  </body>`
})

app.mount(document.body)
