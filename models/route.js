const Point = require('./point');

class Route extends Point {
  constructor(
    location,
    type,
    id,
    name,
    description,
    difficultyLevel,
    length,
    imageUrl,
  ) {
    super(location, type);
    this._id = id;
    this._name = name;
    this._description = description;
    this._difficultyLevel = difficultyLevel;
    this._length = length;
    this._imageUrl = imageUrl;
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getDescription() {
    return this._description;
  }

  setDescription(description) {
    this._description = description;
  }

  getDifficultLevel() {
    return this._difficultyLevel;
  }

  setDifficultLevel(difficultLevel) {
    this._difficultyLevel = difficultLevel;
  }

  getLength() {
    return this._length;
  }

  setLength(length) {
    this._length = length;
  }

  getImageUrl() {
    return this._imageUrl;
  }

  setImageUrl(imageUrl) {
    this._imageUrl = imageUrl;
  }

  // toString method

  toString() {
    return `location: ${this._location},
    type: ${this._type}, 
    id: ${this._id}, 
    name: ${this._name}, 
    description: ${this._description}, 
    difficultLevel: ${this._difficultyLevel}, 
    length: ${this._length}, 
    imageUrl: ${this._imageUrl}`;
  }
}

module.exports = Route;
