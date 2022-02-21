// const {
//   previousMonth,
//   nextMonth,
//   monthDaysFilled,
//   daysToWeeks
// } = require('../lib/date.js')
const { MODE_WEEKLY } = require('../modes.js')

/**
 * Handle montly
 */
module.exports = (state, emitter) => {
  state.weekly = {}

  function setWeekly (weekly) {
    // state.monthly = monthly
    // state.monthly.weeks = daysToWeeks(monthDaysFilled(monthly))
    // emitter.emit('render')
  }

  function setToday () {
    const today = new Date()
    // setMonthly({
    //   year: today.getFullYear(),
    //   month: today.getMonth(),
    //   selected: today
    // })
  }

  emitter.on('toolbar:goto-previous', () => {
    if (state.mode === MODE_WEEKLY) {
      console.log('TODO move to previous week')
      // setMonthly(previousMonth(state.monthly))
    }
  })
  emitter.on('toolbar:goto-home', () => {
    if (state.mode === MODE_WEEKLY) {
      setToday()
    }
  })
  emitter.on('toolbar:goto-next', () => {
    if (state.mode === MODE_WEEKLY) {
      console.log('TODO move to next week')
      // setMonthly(nextMonth(state.monthly))
    }
  })

  // TODO
  // emitter.on('weekly:select-date', (date) => {
  //   state.weekly.selected = date
  //   emitter.emit('render')
  // })

  // TODO
  function moveSelectedDay (offset) {
    console.log('moveSelectedDay', offset)
    // const { selected } = state.monthly
    // const update = new Date(selected)
    // update.setDate(selected.getDate() + offset)
    // setMonthly({
    //   year: update.getFullYear(),
    //   month: update.getMonth(),
    //   selected: update
    // })
  }

  window.addEventListener('keydown', (e) => {
    if (state.mode === MODE_WEEKLY) {
      switch (e.key) {
        case 'ArrowLeft':
          moveSelectedDay(-1)
          break
        case 'ArrowRight':
          moveSelectedDay(+1)
          break
      }
    }
  })

  setToday()
}
