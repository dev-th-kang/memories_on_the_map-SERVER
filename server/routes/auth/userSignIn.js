const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const route = require('express').Router()
route.post('/',(req,res,next)=>{
    passport.authenticate('local-login',(err,user)=>{
        if(!user){
            res.send(err)
        }else{
            req.logIn(user,(err)=>{
                if(err) res.send({"msg":"로그인 에러"});
                else res.send({"msg":"로그인 성공"});
            })
        }
    })(req,res,next)
})

module.exports = route