const Point = require('./point');

class Route extends Point {
  constructor(
    latitude,
    longitude,
    date,
    type,
    id,
    name,
    description,
    difficultLevel,
    length,
    imageUrl,
  ) {
    super(latitude, longitude, date, type);
    this._id = id;
    this._name = name;
    this._description = description;
    this._difficultLevel = difficultLevel;
    this._length = length;
    this._imageUrl = imageUrl;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get description() {
    return this._description;
  }

  set description(value) {
    this._description = value;
  }

  get difficultLevel() {
    return this._difficultLevel;
  }

  set difficultLevel(value) {
    this._difficultLevel = value;
  }

  get length() {
    return this._length;
  }

  set length(value) {
    this._length = value;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  set imageUrl(value) {
    this._imageUrl = value;
  }

  // toString method

  toString() {
    return `Route: { id: ${this.id}, 
    name: ${this.name}, 
    description: ${this.description}, 
    difficultyLevel: ${this.difficultyLevel}, 
    length: ${this.length}, 
    location: ${this.location},
    image: ${this.imageUrl}
  }`;
  }
}

module.exports = Route;
