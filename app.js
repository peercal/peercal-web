var app = require('choo')()
var html = require('choo/html')

app.use(function (state, emitter) {
  state.params = {}
})

app.route('*', function (state, emit) {
  return html`<body>
    <style>
      body {
        margin: 0px;
        overflow: hidden;
        font-family: monospace;
        background: black;
        color: white;
      }
    </style>
    <div>peercal</div>
  </body>`
})

app.mount(document.body)
