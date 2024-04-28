class User {
  constructor(id, name, password, email, phoneNumner) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.phoneNumner = phoneNumner;
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
    return this.phoneNumner;
  }

  setPhoneNumner(phoneNumner) {
    this.phoneNumner = phoneNumner;
  }

  // toString method

  toString() {
    return `User: { id: ${this.id}, 
    name: ${this.name}, 
    password: ${this.password}, 
    email: ${this.email}, 
    phoneNumner: ${this.phoneNumner} }`;
  }
}

module.exports = User;
