const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({ path: './.env' })

let connection
if (process.env.JAWSDB_URL) {
    console.log("jawsdb")
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // create connection
    console.log("local db")
    connection =  mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });
}

connection.connect( (err) => {
    if(err) {
        console.log('Error connecting to database: ' + err)
    } else {
        console.log('mysql connected...')
    }
});

module.exports = connection