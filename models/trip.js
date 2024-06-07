class Trip {
  constructor(
    id,
    name,
    startDate,
    endDate,
    point,
    description,
    tripName,
    userId,
  ) {
    this._id = id;
    this._name = name;
    this._startDate = startDate;
    this._endDate = endDate;
    this._point = point;
    this._description = description;
    this._tripName = tripName;
    this._userId = userId;
  }

  // getters and setters

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  getStartDate() {
    return this._startDate;
  }

  setStartDate(startDate) {
    this._startDate = startDate;
  }

  getEndDate() {
    return this._endDate;
  }

  setEndDate(endDate) {
    this._endDate = endDate;
  }

  getPoint() {
    return this._point;
  }

  setPoint(point) {
    this._point = point;
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  getRouteName() {
    return this._tripName;
  }

  setRouteName(routeName) {
    this._tripName = routeName;
  }

  getUserId() {
    return this._userId;
  }

  setUserId(userId) {
    this._userId = userId;
  }

  // toString method

  toString() {
    return `Trip: { id: ${this._id}, 
    name: ${this._name}, 
    startDate: ${this._startDate}, 
    endDate: ${this._endDate}, 
    point: ${this._point}, 
    description: ${this._description},
    routeName: ${this._tripName},
    userId: ${this._userId} }`;
  }
}

module.exports = Trip;
