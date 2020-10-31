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

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password) {
            return res.status(400).render('login', {
                message: 'Missing email or password.'
            })
        }
        connection.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            if(error) {
                res.render('login', {
                    bad: true,
                    message: 'Email not found'
                })
            } else if (results.length == 0){
                res.render('login', {
                    bad: true,
                    message: 'Email not found'
                })
            }
            else if (!results || !(await bcrypt.compare(password, results[0].password))) {
                res.render('login', {
                    bad: true,
                    message: 'Email or password is incorrect'
                })
            } else {
                const id = results[0].id;

                // const token = jwd.sign({id}, process.env.JWT_SECRET, {
                //     expiresIn: process.env.JWT_EXPIRES_IN
                // });
                //
                // console.log("The token is: " + token);

                // const cookieOptions = {
                //     expires: new Date(
                //         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                //     ),
                //     httpOnly: true
                // }
                // res.cookie('jwt', token, cookieOptions);
                req.session.user_id = id
                res.status(200).redirect("/");
            }
        });
    } catch (error) {
        console.log(error);
    }
}
exports.logout = (req, res) => {
    if(req.session.user_id == null){
        res.render('login', {
            bad: true,
            message: 'Must be logged in to log out.'
        })
    } else {
        console.log("LOGGED OUT");
        req.session.destroy();
        res.render("login", {
            good: true,
            message: 'Successfully logged out'
        });
    }
}

exports.register = (req, res) => {
    const { name, email, phonenumber, password, passwordConf } = req.body;

    connection.query("SELECT email FROM user WHERE email = ?", [email], async (error, results) => {
        if(error){
            console.log("THIS IS THE FIRST ERROR" + error);
            return;
        }
        if(results.length > 0){
           return res.render('register', {
               bad: true,
               message: 'Email already in use'
           });
        } else if(password !== passwordConf) {
            return res.render('register', {
                bad: true,
                message: 'Passwords do not match.'
            });
        } else {

            let hashedPassword = await bcrypt.hash(password, 10);

            connection.query('INSERT INTO user SET ?', {
                username: name,
                email: email,
                phone_number: phonenumber,
                password: hashedPassword
            }, (error, results) => {
                if (error) {
                    console.log("THIS IS THE ERROR: " + error);
                    return;
                } else {
                    console.log(results);
                    return res.render('register', {
                        good: true,
                        message: 'User registered!'
                    });
                }
            })
        }
    })
    //
    // res.redirect('/login')
}

exports.home = (req,res) => {
    console.log("before query");
    //query for values
    const query = `
    SELECT *
    FROM listing
    `;

    let items = connection.query(query, (error,results) => {
        if (error) {
            return console.error(error.message);
        } else {
            console.log("after query rendering results");
            res.render('home',{items:results});
        }
    });

}

exports.post = (req, res) => {
    console.log("connected");
    
    let gameId  = req.body.game_id;
    let image = req.body.image;
    let cond = req.body.condition;
    let pdescr = req.body.productDescription;
    let shP = req.body.shippingPrice;
    let price = req.body.price;
    let title = req.body.title; 
    
    let query = 'INSERT INTO listing_fk0 (game_id, photo_url, condition, description, shippingPrice, price, title) VALUES (?,?,?,?,?,?,?)';
    console.log('hello');
    let data = [gameId,image,cond,pdescr,shP,price,title];
  //  let connection = herokuConnection();
     connection.query(query, data, function(error, result){
      connection.end();
     if(error){
         console.log(error)
     }
        else {
        console.log(result);
        connection.end();
        res.redirect('/', {
            message: 'Post complete!'
        });
    }
        
    }); 
}
