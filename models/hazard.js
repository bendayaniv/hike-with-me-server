class Hazard {
  constructor(id, type, description, severity, reporterName, routeName, date) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.severity = severity;
    this.reporterName = reporterName;
    this.routeName = routeName;
    this.date = date;
  }

  // getters and setters

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getSeverity() {
    return this.severity;
  }

  setSeverity(severity) {
    this.severity = severity;
  }

  getReporterName() {
    return this.reporterName;
  }

  setReporterName(reporterName) {
    this.reporterName = reporterName;
  }

  getRouteName() {
    return this.routeName;
  }

  setRouteName(routeName) {
    this.routeName = routeName;
  }

  getDate() {
    return this.date;
  }

  setDate(date) {
    this.date = date;
  }

  // toString method

  toString() {
    return `Hazard: { id: ${this.id}, 
    type: ${this.type}, 
    description: ${this.description}, 
    severity: ${this.severity}, 
    reporterName: ${this.reporterName},
    routeName: ${this.routeName},
    date: ${this.date} }`;
  }
}

module.exports = Hazard;
