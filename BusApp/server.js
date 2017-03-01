var express=require('express');　
var path = require('path');　　　　　　 //引用express模块
var app=express();　　　　　　　　　　　　　　 //创建一个express实例
var bodyParser = require('body-parser');
var mongojs=require('mongojs');
var db = mongojs('localhost/bus');
var admin = db.collection('admins');
var routes = db.collection('routes');
// db.on('connect', function (){
//   console.log('connect');
// });
// db.on('error', function (err){
//   console.log('database error', err);
// });

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/node_modules"));
app.use(bodyParser.json());

// login
require('./routes')(app);

app.listen(3000);　　　　　　　　　　　　　　　//指定程序监听在3000端口
console.log("Server running on port 3000");　 //在服务器的窗口中打印一行文本

