const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const user = require('../config/user')

passport.use('local-login', new LocalStrategy({
    passReqToCallback:false,
    usernameField:"id",
    passwordField:"pw"
}, (id,pw,done)=>{
    user.userSignIn(id,pw)
    .then(async(values)=>{
        await done (null,values.userinfo)
    }).catch(async(values)=>{
        await done({"msg":values.msg},false)
    })
}))   

passport.serializeUser((user,done)=>{
    
    console.log(`[SERVER LOG - INFO] : "${user.ID}"계정(${user.name}) Session 발행`)
    done(null, user)
})


passport.deserializeUser((user, done)=> {
    console.log(`[SERVER LOG - INFO] : "${user.ID}"계정(${user.name}) Session 획득`)
	done(null, user.name)
}) 