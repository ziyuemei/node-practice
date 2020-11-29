// 引入第三方模块
const express = require('express');
// 对第三方模块进行实例化
const app = express();

// 引入解析 post 消息体内容的插件
const bodyParser = require('body-parser');
// app.use 使用中间件(插件)
app.use(bodyParser.urlencoded({ extended: false }));    // 表单格式传递参数
app.use(bodyParser.json())  // json 格式传递参数

// api接口实现：login模块get方法
app.get('/user/login', (req, res)=>{
    // get 接收参数：query
    console.log(req.query);
    let {us, ps} = req.query
    if(us === '紫月梅' && ps === '123456') {
        res.send({code:0,msg:'登录成功'});
    } else {
        res.send({code:1,msg:'账号密码错误'});
    }
})

// api接口实现：register模块post方法
app.post('/user/register', (req, res)=>{
    // post 接收参数：body
    console.log(req.body);
    // express 不能直接解析消息体(post 发送过来的参数)，需要通过第三方插件来解析：body-parser
    let {us, ps} = req.body
    if(us === '紫月梅' && ps === '123456') {
        res.send({code:0,msg:'登录成功'});
    } else {
        res.send({code:1,msg:'账号密码错误'});
    }
})

// 监听3000端口，开启node服务
app.listen(3000, ()=>{
    console.log('server start');
})