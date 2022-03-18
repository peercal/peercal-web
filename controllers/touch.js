const SWIPE_THRESHOLD = 100
const LONGPRESS_THRESHOLD = 800

/**
 * Controller for handling:
 * - swipe left/right
 * - long press
 */
module.exports = (state, emitter) => {
  let startPos = null
  let longPressTimer = null

  window.addEventListener('touchstart', (event) => {
    const { date, type, eventUrl, eventId } = event.target.dataset

    clearTimeout(longPressTimer)

    if (typeof date === 'string' && type === 'day') {
      event.preventDefault()
      longPressTimer = setTimeout(() => {
        emitter.emit('touch:longpress:date', new Date(date))
      }, LONGPRESS_THRESHOLD)
    } else if (typeof date === 'string' && type === 'week') {
      event.preventDefault()
      longPressTimer = setTimeout(() => {
        emitter.emit('touch:longpress:week', new Date(date))
      }, LONGPRESS_THRESHOLD)
    } else if (typeof eventUrl === 'string' &&
               typeof eventId === 'string' &&
               type === 'event') {
      longPressTimer = setTimeout(() => {
        emitter.emit('touch:longpress:event', eventUrl, eventId)
      }, LONGPRESS_THRESHOLD)
    }

    if (event.touches.length === 1) {
      startPos = event.touches.item(0).clientX
    } else {
      startPos = null
    }
  }, { passive: false })

  window.addEventListener('touchmove', (event) => {
    const pos = event.touches.item(0).clientX
    if (startPos && Math.abs(pos - startPos) > 10) {
      clearTimeout(longPressTimer)
    }
  })

  window.addEventListener('touchend', (event) => {
    const { route } = state
    clearTimeout(longPressTimer)
    if (startPos) {
      const endPos = event.changedTouches.item(0).clientX
      if (endPos > startPos + SWIPE_THRESHOLD) {
        emitter.emit(`${route === '/' ? 'monthly' : route}:swipe:right`)
      } else if (endPos < startPos - SWIPE_THRESHOLD) {
        emitter.emit(`${route === '/' ? 'monthly' : route}:swipe:left`)
      }
    }
  })
}
