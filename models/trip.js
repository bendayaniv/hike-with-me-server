class Trip {
  constructor(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    route,
    user,
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.locations = locations;
    this.description = description;
    this.route = route;
    this.user = user;
  }
}

module.exports = Trip;
