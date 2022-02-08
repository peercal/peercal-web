const app = require('choo')()
const html = require('choo/html')
const {
  body,
  calendar,
  calendarDays,
  calendarDay
} = require('./css.js')

app.use((state, emitter) => {
  state.params = {}
})

app.route('*', (state, emit) => {
  return html`<body class=${body}>
    <div class=${calendar}>
      <div class=${calendarDays}>
        <div class=${calendarDay}>monday</div>
        <div class=${calendarDay}>tuesday</div>
        <div class=${calendarDay}>wednesday</div>
        <div class=${calendarDay}>thursday</div>
        <div class=${calendarDay}>friday</div>
        <div class=${calendarDay}>saturday</div>
        <div class=${calendarDay}>sunday</div>
      </div>
    </div>
  </body>`
})

app.mount(document.body)
