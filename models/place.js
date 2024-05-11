class Place {
  constructor(name, location, length, difficulty, description, images) {
    this.name = name;
    this.location = location;
    this.length = length;
    this.difficulty = difficulty;
    this.description = description;
    this.images = images;
  }

  // getters and setters

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getlocation() {
    return this.location;
  }

  setlocation(lat) {
    this.lat = location;
  }

  getLength() {
    return this.length;
  }

  setLength(length) {
    this.length = length;
  }

  getDifficulty() {
    return this.difficulty;
  }

  setDifficulty(difiiculty) {
    this.difiiculty = difficulty;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getImages() {
    return this.images;
  }

  setImages(images) {
    this.images = images;
  }

  // other methods

  toString() {
    return `Place: { name: ${this.name}, 
        location: ${this.location},  
        length: ${this.length}, 
        difficulty: ${this.difficulty}, 
        description: ${this.description},
        images: ${this.images} }`;
  }
}

module.exports = Place;
