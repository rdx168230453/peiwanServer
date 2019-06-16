const express = require('express')
const router  = express.Router()
const https = require('https');
// const db = require('./../mysql/index')
// const login = require('./../controller/login')


router.post('/login',function(req, res){
    var data = {
        code:req.body.code,
        appId:'wx1d21ec5801a949a9',
        secret:'0120cfe4a748562dcfcc30579283a7e3'
    }
    if(!data.code){
        return res.send({
            message:'code为空'
        })
    }
    var wechatServer = 'https://api.weixin.qq.com/sns/jscode2session?appid='+ data.appId+'&secret='+ data.secret 
        +'&js_code=' + data.code + '&grant_type=authorization_code'
    new Promise((resolve,reject)=>{
        https.get(wechatServer,(req,res)=>{
            let html = '';
            req.on('data', function (data) {
                html += data;
            });
            req.on('end', function () {
                var result = JSON.parse(html);
                resolve(result)
            });
        })    
    }).then((data)=>{
        //数据库存储
        var sqlstr = 'insert into user(openid,session_key) values(?,?) on duplicate key update session_key = ?' //检查更新保存
        var params=[data.openid,data.session_key,data.session_key]
        // db.query(sqlstr,params,function(error,res){
        //     if(error) throw error
        //     console.log(res)
        // })
        res.send({
            openid:data.openid,
            session3rd:data['session_key']
        })
    })
})  

router.post('/saveInfo',function(req,res){
    var data = req.body
    console.log(data)
    var sql = 'update user set session_key=?,avatarUrl=?,city=?,country=?,gender=?,language=?,nickName=?,province=? where openid = ?'
    var params = [data.session_key,data.avatarUrl,data.city,data.country,data.gender,data.language,data.nickName,data.province,data.openid]
    db.query(sql,params,(error)=>{
        if(error) throw error
        res.send('提交成功')
    })
})
router.post('/skillSubmit',function(req,res){
    var body = req.body
    var sql = 'insert into examine() value(?,?,?,?,?,?);'
    var params=[body.id,body.type,body.skillimg,body.voiceintro,body.textintro,body.ranking]
    db.query(sql,params,(error)=>{
        if(error) throw error
        res.send('提交成功')
    })
})
router.get('/list',function(req,res){
    var sql = 'select * from examine'
    db.query(sql,(error,data)=>{
        if(error) throw errow
        res.send({
            status:200,
            data:data
        })
    })
})
router.get('/getListTest',function(req,res){
    console.log('123')
    res.send({
        status:200,
        data:[1,2,4]
    })
})  
module.exports = router
