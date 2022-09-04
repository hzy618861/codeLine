#!/usr/bin/env node
const child_process = require('child_process')
const express = require('express')
const process = require('process')
const path = require('path')
const fs = require('fs')
const app = express()
const args = process.argv.slice(2)
//客户端初始化事件 点击触发获取服务器跳转对应行号代码
let port = 8888
if(args[0] == '--PORT'){
    //设置端口号
    port =  args[1]
}
let loader = fs.readFileSync(path.resolve(__dirname,'./template.js'),'utf-8')
loader = loader.replace(/{PORT}/g,port)
fs.writeFileSync(path.resolve(__dirname,'./client.js'),loader)
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/lineCode',(req, res)=>{
    const path = req.query.filePath
    if(path) {
        // 执行vscode定位代码行命令
        child_process.exec(`code -r -g ${path}`)
        res.send('ok')
    }
})

app.listen(port, () => {
    console.log(`line-loader server listening on port ${port}!`)
})
