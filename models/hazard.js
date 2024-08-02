const Point = require('./point');

class Hazard extends Point {
  constructor(
    location,
    type,
    id,
    hazardType,
    description,
    severity,
    reporterId,
    routeName,
  ) {
    super(location, type);
    this._id = id;
    this._hazardType = hazardType;
    this._description = description;
    this._severity = severity;
    this._reporterId = reporterId;
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

  getReporterId() {
    return this._reporterId;
  }

  setReporterId(reporterId) {
    this._reporterId = reporterId;
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
    reporterId: ${this._reporterId}, 
    routeName: ${this._routeName}`;
  }
}

module.exports = Hazard;
