const {
  previousMonth,
  nextMonth,
  monthDaysFilled,
  daysToWeeks
} = require('../lib/date.js')

const MONTLY = 'montly'

/**
 * Handle montly
 */
module.exports = (state, emitter) => {
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

  emitter.on('toolbar:goto-previous', () => {
    if (state.mode === MONTLY) {
      setMonthly(previousMonth(state.monthly))
    }
  })
  emitter.on('toolbar:goto-home', () => {
    if (state.mode === MONTLY) {
      setToday()
    }
  })
  emitter.on('toolbar:goto-next', () => {
    if (state.mode === MONTLY) {
      setMonthly(nextMonth(state.monthly))
    }
  })

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

  setToday()
}
