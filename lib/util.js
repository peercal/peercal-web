function pad (nr) {
  return nr < 10 ? `0${nr}` : nr
}

module.exports = { pad }
