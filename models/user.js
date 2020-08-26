const shortId = require('shortid');
const db = require("../data/database.js");

module.exports = class User{
    constructor(username, name, password, type) {
        this.userId = shortId.generate();
        this.username = username;
        this.name = name;
        this.password = password;
        this.type = type;
        this.dataCreated = new Date();
    }

    getInstance(){
        return this;
    }
}