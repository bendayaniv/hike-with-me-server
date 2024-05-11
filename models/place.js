class Place {
    constructor(name, lat, long, length, difiiculty, description, image) {
        this.name = name;
        this.lat = lat;
        this.long = long;
        this.length = length;
        this.difiiculty = difiiculty;
        this.description = description;
        this.image = image;
    }

    // getters and setters

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getLat() {
        return this.lat;
    }

    setLat(lat) {
        this.lat = lat;
    }

    getLong() {
        return this.long;
    }

    setLong(long) {
        this.long = long;
    }

    getLength() {
        return this.length;
    }

    setLength(length) {
        this.length = length;
    }

    getDifiiculty() {
        return this.difiiculty;
    }

    setDifiiculty(difiiculty) {
        this.difiiculty = difiiculty;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    // other methods

    toString() {
        return `Place: { name: ${this.name}, 
        lat: ${this.lat}, 
        long: ${this.long}, 
        length: ${this.length}, 
        difiiculty: ${this.difiiculty}, 
        description: ${this.description},
        image: ${this.image} }`;
    }
}

module.exports = Place;