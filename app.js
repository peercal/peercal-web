const app = require('choo')()
const html = require('choo/html')

const { monthToString } = require('./date.js')
const {
  body,
  calendar,
  calendarHeaderTitle,
  weekdaysHeader,
  weekdayHeaderCell
} = require('./css.js')

app.use((state, emitter) => {
  state.current = {
    month: 1,
    year: 2022
  }

  emitter.on('month:prev', () => {
    if (state.current.month === 0) {
      state.current.month = 11
      state.current.year--
    } else {
      state.current.month--
    }
    emitter.emit('render')
  })
  emitter.on('month:next', () => {
    if (state.current.month === 11) {
      state.current.month = 0
      state.current.year++
    } else {
      state.current.month++
    }
    emitter.emit('render')
  })
})

app.route('*', (state, emit) => {
  const { month, year } = state.current
  return html`<body class=${body}>
    <div class=${calendar}>
      <div>
        <button onclick=${gotoPrevMonth}>${'<'}</button>
        <div class=${calendarHeaderTitle}>${monthToString(month)} ${year}</div>
        <button onclick=${gotoNextMonth}>${'>'}</button>
      </div>
      <div class=${weekdaysHeader}>
        <div class=${weekdayHeaderCell}>mon</div>
        <div class=${weekdayHeaderCell}>tue</div>
        <div class=${weekdayHeaderCell}>wed</div>
        <div class=${weekdayHeaderCell}>thu</div>
        <div class=${weekdayHeaderCell}>fri</div>
        <div class=${weekdayHeaderCell}>sat</div>
        <div class=${weekdayHeaderCell}>sun</div>
      </div>
    </div>
  </body>`

  function gotoPrevMonth () { emit('month:prev') }
  function gotoNextMonth () { emit('month:next') }
})

app.mount(document.body)
