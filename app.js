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
})

app.route('*', (state, emit) => {
  const { month, year } = state.current
  return html`<body class=${body}>
    <div class=${calendar}>
      <div>
        <button>-</button>
        <div class=${calendarHeaderTitle}>${monthToString(month)} ${year}</div>
        <button>+</button>
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
})

app.mount(document.body)
