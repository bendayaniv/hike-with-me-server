class Recommendation {
  constructor(
    id,
    rate,
    description,
    /*reporter*/ reporterName,
    /*route*/ routeName,
  ) {
    this.id = id;
    this.rate = rate;
    this.description = description;
    // this.reporter = reporter;
    this.reporterName = reporterName;
    // this.route = route;
    this.routeName = routeName;
  }
}

module.exports = Recommendation;
