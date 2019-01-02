var express = require('express')
var app = express()
var http = require('http');
var bodyParser = require('body-parser');
var https = require('https');

const stringRandom = require('string-random');
// app.use(bodyParser.urlencoded({
//   extended:true
// }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Hello Worlds')
})
//微信登录换取openid
app.post('/app/login',function (req, res) {
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
})
http.createServer(app).listen(process.env.PORT || 5050,() => {
  console.log('node localsever start success!')
})
