const route = require('express').Router()
route.post('/',(req,res)=>{
    
    console.log(`[SERVER LOG - INFO] : ${req.user}에서 로그아웃 요청`)
    req.logOut((err)=>{
        if(err){
            console.log(`[SERVER LOG - ERR] : ${req.user}에서 로그아웃 실패`)
            res.send({"msg":"로그아웃 실패"})
        }
        console.log(`[SERVER LOG - SUCCEED] : ${req.user}에서 로그아웃 성공`)
        res.send({"msg":"로그아웃 성공"})
    });
})
module.exports = route