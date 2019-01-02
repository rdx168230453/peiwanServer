var express = require('express')
var app = express()

module.exports = {
    interFace(){
        console.log(app)
        app.get('/pw/list',(req,res)=>{
            console.log('123')
            res.send([{
                id: 2
            }])
        })
    }
}