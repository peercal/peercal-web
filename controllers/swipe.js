const SWIPE_THRESHOLD = 100

/**
 * Controller for handling swiping left and right.
 */
module.exports = (state, emitter) => {
  let startPos = null

  window.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
      startPos = event.touches.item(0).clientX
    } else {
      startPos = null
    }
  }, false)

  window.addEventListener('touchend', (event) => {
    if (startPos) {
      const endPos = event.changedTouches.item(0).clientX
      if (endPos > startPos + SWIPE_THRESHOLD) {
        emitter.emit('swipe:right')
      } else if (endPos < startPos - SWIPE_THRESHOLD) {
        emitter.emit('swipe:left')
      }
    }
  }, false)
}
