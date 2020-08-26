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

    save(){
        let sql ='INSERT INTO user (userId, username, name, password, type, dataCreated) VALUES (?,?,?,?,?,?)'
        let params =[this.userId, this.name, this.username , this.name, this.password, this.type, this.dataCreated]
        db.run(sql, params, function (err, result) {
            if (err){
                return;
            }
            return this;
        });
    }

    get(userId){

    }
}