class Hazard {
  constructor(id, type, description, severity, reporter, route, date) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.severity = severity;
    this.reporter = reporter;
    this.route = route;
    this.date = date;
  }
}

module.exports = Hazard;
