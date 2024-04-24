class Recommendation {
  constructor(id, rate, description, reporter, route) {
    this.id = id;
    this.rate = rate;
    this.description = description;
    this.reporter = reporter;
    this.route = route;
  }
}

module.exports = Recommendation;
