class Unit {
  constructor(coordinates) {
    this.coordinates = coordinates
  }

  move(newCoordinates) {
    this.coordinates = newCoordinates
    renderUnit(this)
  }
}

