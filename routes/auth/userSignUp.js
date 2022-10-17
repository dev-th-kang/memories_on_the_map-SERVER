const route = require('express').Router()
const user = require('../../config/user')
const passport = require('passport')
/**TODO: JOIN 
 * get name, ID, PW, email, phone
 */
const UserIDSearch = async(id)=>{
    await user.userSearch(id)
    .then((values)=>{
        result = values
    }).catch(async(values)=>{
        result = values
    })
    return result
}
route.post('/',async(req,res)=>{
    const userinfo = req.body
    const result = await UserIDSearch(userinfo.id)
    if(!result.state){
        console.log(`[SERVER LOG - ERR] : ${userinfo.id}은 이미 존재`)
        res.send(result)
    }
    else{
        console.log(`[SERVER LOG - SUCCEED] : ${userinfo.id}으로 가입완료`)
        user.userSignUp(userinfo)
        .then((values)=>{
            res.send(values)
        }).catch((values)=>{
            res.send(values)
        })
    }
})

module.exports = route