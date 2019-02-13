var express = require('express')
var app = express();
var http = require('http');
var https = require('https');
var bodyParser = require('body-parser');
var config = require('./config/index'); 
var router = require('./routes/index.js')
var mysql = require('./mysql/index')


//解析json
app.use(bodyParser.json());
router(app)
http.createServer(app).listen(config.port,() => {
  console.log('成功监听端口：'+ config.port)
})
