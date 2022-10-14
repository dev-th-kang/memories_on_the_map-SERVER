const route = require('express').Router()

const auth = require('./auth/auth')
const userSignIn = require('./auth/userSignIn')
const userSignUp = require('./auth/userSignUp')
const userLogOut = require('./auth/userLogOut')


require('../middleware/passport')

/**TODO: 인증부 route */
route.use('/auth', auth)
route.use('/auth/join', userSignUp)
route.use('/auth/login', userSignIn)
route.use('/auth/logout', userLogOut)


module.exports = route