var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId text,
            username text,
            name text, 
            password text,
            type text,
            dataCreated text 
          
            )`,
            (err) => {
                if (err) {
                    // Table already created
                }
            });
    }
});


module.exports = db