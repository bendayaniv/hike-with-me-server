class Recommendation {
  constructor(
    id,
    rate,
    description,
    reporterName,
    routeName,
  ) {
    this.id = id;
    this.rate = rate;
    this.description = description;
    this.reporterName = reporterName;
    this.routeName = routeName;
  }

  // getters and setters

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getRate() {
    return this.rate;
  }

  setRate(rate) {
    this.rate = rate;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
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

  // toString method

  toString() {
    return `Recommendation: { id: ${this.id}, 
    rate: ${this.rate}, 
    description: ${this.description}, 
    reporterName: ${this.reporterName}, 
    routeName: ${this.routeName} }`;
  }
}

module.exports = Recommendation;
