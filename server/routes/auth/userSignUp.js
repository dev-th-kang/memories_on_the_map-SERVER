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
    console.log(result)
    if(!result.state)
        res.send(result)
    else{
        user.userSignUp(userinfo)
        .then((values)=>{
            res.send(values)
        }).catch((values)=>{
            res.send(values)
        })
    }
})

module.exports = route