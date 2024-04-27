class Trip {
  constructor(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routeName,
    userId,
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.locations = locations;
    this.description = description;
    this.routeName = routeName;
    this.userId = userId;
  }
}

module.exports = Trip;
