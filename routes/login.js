var express = require('express')
var router  = express.Router()
var https = require('https');
var db = require('./../mysql/index')
let login = require('./../controller/login')


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
        var sqlstr = 'insert into user(openid,session_key) values(?,?)'
        var params=[data.openid,data.session_key]
        db.query(sqlstr,params,function(error,res){
            if(error) throw error
            console.log(res)
        })
        res.send({
            openid:data.openid,
            session3rd:data['session_key']
        })
    })
})  

router.get('/saveInfo',function(req,res){
    console.log(req.body)
})

module.exports = router