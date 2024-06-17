const Location = require('./location');

class Point {
  constructor(location, type) {
    this._location = new Location(
      location.latitude,
      location.longitude,
      location.date,
    );
    this._type = type;
  }

  // getters and setters

  get location() {
    return this._location;
  }

  set location(value) {
    this._location = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  // toString method
  toString() {
    return `location: ${this.location}, type: ${this.type}`;
  }
}

module.exports = Point;
