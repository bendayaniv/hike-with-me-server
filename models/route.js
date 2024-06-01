class Route {
  constructor(
    id,
    name,
    description,
    difficultyLevel,
    length,
    location,
    imageUrl,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.difficultyLevel = difficultyLevel;
    this.length = length;
    this.location = location;
    this.imageUrl = imageUrl;
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

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getDifficultyLevel() {
    return this.difficultyLevel;
  }

  setDifficultyLevel(difficultyLevel) {
    this.difficultyLevel = difficultyLevel;
  }

  getLength() {
    return this.length;
  }

  setLength(length) {
    this.length = length;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getImage() {
    return this.imageUrl;
  }

  setImage(imageUrl) {
    this.imageUrl = imageUrl;
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
