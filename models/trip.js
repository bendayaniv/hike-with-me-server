class Trip {
  constructor(
    id,
    name,
    startDate,
    endDate,
    locations,
    description,
    routesNames,
    userId,
  ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.locations = locations;
    this.description = description;
    this.routesNames = routesNames;
    this.userId = userId;
  }

  // getters and setters

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getStartDate() {
    return this.startDate;
  }

  setStartDate(startDate) {
    this.startDate = startDate;
  }

  getEndDate() {
    return this.endDate;
  }

  setEndDate(endDate) {
    this.endDate = endDate;
  }

  getLocations() {
    return this.locations;
  }

  setLocations(locations) {
    this.locations = locations;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getRoutesNames() {
    return this.routesNames;
  }

  setRoutesNames(routeName) {
    this.routesNames = routeName;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  // toString method

  toString() {
    return `Trip: { id: ${this.id}, 
    name: ${this.name}, 
    startDate: ${this.startDate}, 
    endDate: ${this.endDate}, 
    locations: ${this.locations}, 
    description: ${this.description},
    routesNames: ${this.routesNames},
    userId: ${this.userId} }`;
  }
}

module.exports = Trip;
