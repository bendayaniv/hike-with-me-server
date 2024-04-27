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
}

module.exports = Recommendation;
