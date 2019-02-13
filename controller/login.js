

const stringRandom = require('string-random'); //随机码
var bodyParser = require('body-parser');
class login {
    async wxLogin(req,res,next){
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
        let result = ''
    
        new Promise((resolve,reject)=>{
            https.get(wechatServer,(req,res)=>{
                let html = '';
                req.on('data', function (data) {
                    html += data;
                });
                req.on('end', function () {
                    result = JSON.parse(html);
                    resolve(result)
                });
            })    
        }).then((data)=>{
        //数据库存储
            var openid = stringRandom(16);
            var session3rd = stringRandom(16);
            res.send({
                openid:openid,
                session3rd:session3rd
            })
        })
    }
    saveInfo(req,res){
        res.send('保存信息')
    }
} 
module.exports = new login()