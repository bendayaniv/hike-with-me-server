class Location {
  constructor(latitude, longitude, date) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
  }

  getLat() {
    return this.latitude;
  }

  setLat(lat) {
    this.latitude = lat;
  }

  getLng() {
    return this.longitude;
  }

  setLng(lng) {
    this.longitude = lng;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }

  // toString method
  toString() {
    return `lat: ${this.latitude}, lng: ${this.longitude}, date: ${this.date}`;
  }
}

module.exports = Location;
