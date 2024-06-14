const Point = require('./point');

class Hazard extends Point {
  constructor(
    location,
    type,
    id,
    hazardType,
    description,
    severity,
    reporterName,
    routeName,
  ) {
    super(location, type);
    this._id = id;
    this._hazardType = hazardType;
    this._description = description;
    this._severity = severity;
    this._reporterName = reporterName;
    this._routeName = routeName;
  }

  // getters and setters

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getHazardType() {
    return this._hazardType;
  }

  setHazardType(hazardType) {
    this._hazardType = hazardType;
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  getSeverity() {
    return this._severity;
  }

  setSeverity(severity) {
    this._severity = severity;
  }

  getReporterName() {
    return this._reporterName;
  }

  setReporterName(reporterName) {
    this._reporterName = reporterName;
  }

  getRouteName() {
    return this._routeName;
  }

  setRouteName(routeName) {
    this._routeName = routeName;
  }

  // toString method

  toString() {
    return `lat: ${this._latitude}, 
    lng: ${this._longitude}, 
    date: ${this._date}, 
    type: ${this._type}, 
    id: ${this._id}, 
    hazardType: ${this._hazardType},
    description: ${this._description}, 
    severity: ${this._severity}, 
    reporterName: ${this._reporterName}, 
    routeName: ${this._routeName}`;
  }
}

module.exports = Hazard;
