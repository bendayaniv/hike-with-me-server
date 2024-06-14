class Location {
  constructor(lat, lng, date) {
    this.latitude = lat;
    this.longitude = lng;
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
