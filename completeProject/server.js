const express = require('express')
const db = require('./db/connect')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引入路由
const userRouter = require('./router/userRouter')

// 使用
app.use('/user', userRouter)

app.listen(3000, ()=>{
    console.log('服务启动成功')
})