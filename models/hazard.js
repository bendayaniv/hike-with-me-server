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
}

module.exports = Hazard;
