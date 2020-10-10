const mysql = require('mysql')

let connection
if (process.env.JAWSDB_URL) {
    console.log("jawsdb")
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // create connection
    console.log("local db")
    connection =  mysql.createConnection({
        host: 'localhost'	,
        user: 'root',
        password: 'carcassonne',
        database: 'bgtp',
    });
}

connection.connect();

module.exports = connection