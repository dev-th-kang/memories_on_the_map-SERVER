const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const db = require('./config/db')
const route = require('./routes/route')
const server = express()
const dotenv = require('dotenv').config()
const PORT = process.env.SERVER_PORT;

//TODO:cors middleware setting
server.use(cors({
    
    origin: true,
    credentials:true
}))

server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge:6000}
}));

server.use(passport.initialize());
server.use(passport.session());

//TODO:BODYPARSER middleware setting
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

//TODO:middleware
server.use('/api', route)


//listen & test
server.listen(PORT, ()=>{
    console.log(`[SERVER LOG - http://localhost:${PORT} ] : SERVER OPEN ..!`)
})

db.connect(()=>console.log(`[SERVER LOG - http://localhost:${PORT} ] : DB OPEN ..!`))