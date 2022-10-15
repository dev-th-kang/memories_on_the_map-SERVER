const db = require('./db')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const USER_TABLE = process.env.DB_USER_TABLE
module.exports ={
    userSearch: (id)=> new Promise((resolve,reject)=>{
        const sql = `select * from ${USER_TABLE} where ID = "${id}"`
        db.query(sql, (err,results)=>{
            if(err) reject({'state':false,'msg':'디비 에러'})
            if(!results.length) resolve({'state':true})
            else reject({'state':false,'msg':'아이디 이미 존재'})
        })
    }),
    userSignUp: (userinfo)=> new Promise((resolve,reject)=>{
    
        const {name,id,pw,email,phone} = userinfo
        const hash = bcrypt.hashSync(pw,12)
        const sql =`insert into ${USER_TABLE} values("${name}","${id}","${hash}","${email}","${phone}")`
        db.query(sql,(err,results)=>{
            if(results.affectedRows){
                resolve({'msg':'가입 성공'})
            }else{
                reject({'msg':'디비 에러'})
            }
        })
    }),
    userSignIn: (id,pw)=> new Promise((resolve,reject)=>{
        const sql = `select * from ${USER_TABLE} where ID = "${id}"`
        db.query(sql, (err,results)=>{
            if(results.length){
                //ID 일치
                const hashPW = results[0].PW
                if(bcrypt.compareSync(pw,hashPW))
                    resolve({'sate':true,'userinfo':results[0]})
                else
                reject({'state':false,'msg':'비밀번호 미일치'})
            }

            else reject({'state':false,'msg':'아이디 미일치'})
        })
        
    })
}


/*
create table memberlist(
	name varchar(150) not null, 
    ID varchar(150) not null, 
    PW varchar(150) not null,
    email varchar(150) not null, 
    phone varchar(150)  not null,
    primary key(ID) 
)
*/