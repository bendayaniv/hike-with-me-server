class Location {
  constructor(latitude, longitude, date) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
  }

  // getters and setters

  getLatitude() {
    return this.latitude;
  }

  setLatitude(latitude) {
    this.latitude = latitude;
  }

  getLongitude() {
    return this.longitude;
  }

  setLongitude(longitude) {
    this.longitude = longitude;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }

  // toString method

  toString() {
    return `lat: ${this.latitude}, lng: ${this.longitude}, date: ${this.date},`;
  }
}

module.exports = Location;
