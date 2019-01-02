
var mongolass = require('mongoose')


mongolass.connect('mongo',{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log('Error:'+err)
    }else{
        console.log('connect success')
    }
})

var db = mongolass.connection;

db.on('open',(err)=>{
    if(err) throw err
    console.log('数据库已打开,connect success')
})

db.on('error',(err)=>{
    if(err) throw err
    console.log('数据库断开')
    mongolass.disconnect();
})
db.on('close',(err)=>{
    if(err) throw err
    console.log('数据库已断开')
    mongolass.connect('',{server:{auto_reconnect:true}})
})