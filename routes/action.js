const express = require('express');
const request = require('request');
const moment = require('moment');
const mysql  = require('mysql'); //require the mysql package

// const mysqlConfig = {//define your MYSQL configuration
//     database: process.env.MYSQL_DATABASE, //env variable
//     host: process.env.MYSQL_HOST,
//     password: process.env.MYSQL_PASSWORD,
//     port: 3306,
//     user: process.env.MYSQL_USER,
// };

mysqlConfig.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    mysqlConfig.query(sql, function (err,result){
        if(err) throw err;
        console.log("Result: " + result);
    });
});

const pool = mysql.createPool(mysqlConfig); //create the connection pool
const router = express.Router();

router.get('/login', async function(req, res) {
    const password = req.query.password;
    const username = req.query.username;
    const user = await new Promise((resolve, reject) => {
        const query = `
        SELECT *
        FROM user
        WHERE username = '${username}' AND password = '${password}';`;

        pool.query(query, (error, results) => { //execute query
            if (error) {
                req.err = error;
                reject(error);
            } else {
                console.log("worked!")
                resolve(results);
            }
        });
    });
});

//get title,and description for listing
router.get('/index', async function(req, res) {
    var listingList = [];
    const lisiting = await new Promise((resolve, reject) => {
        const query = `
        SELECT *
        FROM listing
        ;`;

        pool.query(query, (error, results) => { //execute query
            if (error) {
                req.err = error;
                reject(error);
            } else {
                console.log("listing")
                listingList = {
                    description:'decription'
                }

                }
        });
    });
});

//get post details from listing / gam