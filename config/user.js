const db = require('./db')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const USER_TABLE = process.env.DB_USER_TABLE
module.exports ={
    userDelete:(id) => new Promise((resolve,reject)=>{
        const sql = `DELETE FROM ${USER_TABLE} WHERE ID = "${id}"`
        console.log(sql)
        db.query(sql,(err,result)=>{
            if(err) reject({'state':false,'msg':'디비 에러'})
            if(result.affectedRows) resolve({'state':true,'msg':'User가 정상적으로 삭제되었습니다.'})
            else reject({'state':false,'msg':'User 컬럼이 존재하지않습니다.'});
        })
    }),
    /**
     * FUNC (대상, 변경요소) */
    userUpdate:(id, userinfo)=>new Promise((resolve,reject)=>{
        //const {name, pw,email,phone} = userinfo;
        SET ="";
        //PW 일때 암호화 걸기
        Object.keys(userinfo).forEach((e)=>{
            if(e == "pw")
                SET += `${e} = "${bcrypt.hashSync(userinfo[e],12)}",`
            else
                SET += `${e} = "${userinfo[e]}",`
        })

        SET = SET.substr(0,SET.length-1);
        const sql = `UPDATE ${USER_TABLE} SET ${SET} where ID = "${id}"`
        db.query(sql,(err,result)=>{
            if(err) reject({'state':false,'msg':'디비 에러'})
            if(result.affectedRows) resolve({'state':true,'msg':'User 업데이트 성공'})
            else reject({'state':false,'msg':'User 실패'})
        })
    }),

    userFind:(id)=>new Promise((resolve,reject)=>{
        const sql = `select * from ${USER_TABLE} where ID = "${id}"`
        db.query(sql, (err,results)=>{
            if(err) reject({'state':false,'msg':'디비 에러'})
            if(results.length) resolve({'state':true, 'db_result':results[0]})
            else reject({'state':false,'msg':'User 정보 존재하지않음'})
        })
    }),
    usersFind:()=>new Promise((resolve,reject)=>{
        const sql = `select * from ${USER_TABLE}`
        db.query(sql, (err,results)=>{
            if(err) reject({'state':false,'msg':'디비 에러'})
            if(results.length) {
                let userlist = []
                results.forEach((v)=>{
                    userlist.push({
                        name:v['name'],
                        ID:v['ID'],
                        email:v['email'],
                        phone:v['phone']
                    })
                })
                resolve({'state':true, 'db_result':userlist})
            }
            else reject({'state':false,'msg':'User 정보 존재하지않음'})
        })
    }),
    existUserSearch: (id)=> new Promise((resolve,reject)=>{
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