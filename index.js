const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const config = require('./config/index');
const router = require('./routes/index.js');
const webSocket = require('./routes/webSocket')
// var mysql = require('./mysql/index')
//解析json
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
//添加路由
router(app)

const server = http.createServer(app)
//添加webSocket
webSocket(server)

server.listen(config.port, () => {
  console.log('成功监听端口：' + config.port)
})