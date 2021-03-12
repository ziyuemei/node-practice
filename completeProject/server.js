const express = require('express')
const db = require('./db/connect')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require('path')
const request = require('request')
const cookieParse = require('cookie-parser')
const session = require('express-session')
    // const cors = require('cors')
    // app.use(cors())
app.use('/api', express.static(path.join(__dirname, './apidoc')))
app.use('/public', express.static(path.join(__dirname, './static')))


//  session 整体配置
// app.use(session({
//     secret: 'abcd', // 设置私钥
//     cookie: { maxAge: 1000 * 10 }, // 设置过期时间
//     resave: true,
//     saveUninitialized: false
// }))


// 引入路由
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')

// 使用
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/file', fileRouter)
app.get('/tengxun', (req, res) => {
    request('https://v.qq.com/x/cover/mzc002000w08m6u.html', (err, response, body) => {
        if (!err) {
            console.log(body)
            res.send(body)
        }
    })
})

app.listen(3000, () => {
    console.log('服务启动成功')
})