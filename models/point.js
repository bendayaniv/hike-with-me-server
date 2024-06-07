class Point {
  constructor(latitude, longitude, date, type) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
    this.type = type;
  }

  get latitude() {
    return this._latitude;
  }

  set latitude(value) {
    this._latitude = value;
  }

  get longitude() {
    return this._longitude;
  }

  set longitude(value) {
    this._longitude = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  // toString method
  toString() {
    return `lat: ${this.latitude}, lng: ${this.longitude}, date: ${this.date}, type: ${this.type}`;
  }
}

module.exports = Point;
