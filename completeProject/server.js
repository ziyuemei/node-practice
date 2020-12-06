const express = require('express')
const db = require('./db/connect')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require('path')
app.use('/public', express.static(path.join(__dirname,'./apidoc')))

// 引入路由
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')

// 使用
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/file', fileRouter)

app.listen(3000, ()=>{
    console.log('服务启动成功')
})