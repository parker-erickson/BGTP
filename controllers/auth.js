const mysql = require("mysql");
const jwd = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

let id
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password) {
            return res.status(400).render('login', {
                message: 'Missing email or password.'
            })
        }
        connection.query('SELECT * FROM user WHERE email = ?', [email], async(error, results) => {
            console.log(results);
            if ( !results || !(await bcrypt.compare(password, results[0].password)) ){
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                })
            } else {
                id = results[0].id;

                const token = jwd.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res) => {
    console.log("LOGGED OUT");
    res.redirect('/login');
}

exports.register = (req, res) => {
    const { name, email, phonenumber, password, passwordConf } = req.body;

    connection.query("SELECT email FROM user WHERE email = ?", [email], async (error, results) => {
        if(error){
            console.log(error);
        }
        if(results.length > 0){
           return res.render('register', {
               message: 'Email already in use'
           });
        } else if(password !== passwordConf) {
            return res.render('register', {
                message: 'Passwords do not match.'
            });
        }

        res.redirect('/register')

        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        connection.query('INSERT INTO user SET ?', {username: name, email: email, phone_number: phonenumber, password: hashedPassword}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
               return res.render('register', {
                   message: 'User registered!'
               })
            }
        })
    })
}