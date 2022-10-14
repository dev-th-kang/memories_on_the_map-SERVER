const route = require('express').Router()
route.post('/',(req,res)=>{
    req.logOut((err)=>{
        if(err) res.send({"msg":"로그아웃 실패"})
        else res.send({"msg":"로그아웃 성공"})
    });
})
module.exports = route