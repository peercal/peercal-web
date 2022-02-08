const app = require('choo')()
const html = require('choo/html')
const css = require('sheetify')

app.use(function (state, emitter) {
  state.params = {}
})

const body = css`
  :host {
    height: 100%;
    margin: 0px;
    overflow: hidden;
    font-family: monospace;
    background: black;
    color: white;
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
    border: 1px solid red;
  }
`
const calendarDays = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`
const calendarDay = css`
  :host {
    width: inherit;
    text-align: center;
    border: 1px solid red;
    padding: 5px;
  }
`

app.route('*', function (state, emit) {
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
