const route = require('express').Router()
const user = require('../../config/user')
require('../../middleware/passport')
//TODO: restful
route.get('/:id',(req,res)=>{
    const id = req.params.id
    user.userFind(id)
    .then((values)=>{
        res.status(200).send(values)
    })
    .catch((values)=>{
        res.status(200).send(values)
        
    })
})

route.get('/',(req,res)=>{
    user.usersFind()
    .then((values)=>{
        res.status(200).send(values)
    })
    .catch((values)=>{
        res.status(200).send(values)
    })
})

route.put('/',(req,res)=>{
    if(req.user){
        const userinfo = req.body;
        //TODO:로그인 됨;
        user.userUpdate(req.user.id, userinfo)
        .then((values)=>{
            res.status(200).send(values)
        }) 
        .catch((values)=>{
            res.status(200).send(values)
        })
        return;
        
    }else{
        res.status(400).send({'msg':'로그인을 해주세요.'})
    }
})

route.delete('/',(req,res)=>{
    if(req.user){
        user.userDelete(req.user.id)
        .then((values)=>{
            res.status(200).send(values)
        }) 
        .catch((values)=>{
            res.status(200).send(values)
        })
        return;
    }else{
        res.status(400).send({'msg':'로그인을 해주세요.'})
    }

})



module.exports = route