class Route {
  constructor(id, name, description, difficultyLevel, length, location) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.difficultyLevel = difficultyLevel;
    this.length = length;
    this.location = location;
  }
}

module.exports = Route;
