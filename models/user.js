class User {
  constructor(
    id,
    name,
    email,
    password,
    phoneNumber,
    hometown,
    active,
    location,
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.hometown = hometown;
    this.active = active;
    this.location = location;
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

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPhoneNumner() {
    return this.phoneNumber;
  }

  setPhoneNumner(phoneNumner) {
    this.phoneNumber = phoneNumner;
  }

  getHometown() {
    return this.hometown;
  }

  setHometown(hometown) {
    this.hometown = hometown;
  }

  getActive() {
    return this.active;
  }

  setActive(active) {
    this.active = active;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  // toString method

  toString() {
    return `User: { id: ${this.id}, 
    name: ${this.name}, 
    password: ${this.password}, 
    email: ${this.email}, 
    phoneNumber: ${this.phoneNumber},
    hometown: ${this.hometown},
    active: ${this.active},
    location: ${this.location}}`;
  }
}

module.exports = User;
