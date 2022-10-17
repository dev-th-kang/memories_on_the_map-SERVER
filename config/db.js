const mysql = require('mysql')
const dotenv = require('dotenv').config()

module.exports = mysql.createConnection({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
})