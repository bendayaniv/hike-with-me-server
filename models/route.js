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
    return this._difficultLevel;
  }

  setDifficultLevel(difficultLevel) {
    this._difficultLevel = difficultLevel;
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
    return `lat: ${this._latitude}, 
    lng: ${this._longitude}, 
    date: ${this._date}, 
    type: ${this._type}, 
    id: ${this._id}, 
    name: ${this._name}, 
    description: ${this._description}, 
    difficultLevel: ${this._difficultLevel}, 
    length: ${this._length}, 
    imageUrl: ${this._imageUrl}`;
  }
}

module.exports = Route;
