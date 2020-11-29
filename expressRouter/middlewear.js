const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 中间件

// static 静态目录文件
// app.use(express.static(path.join(__dirname,'./static')));
// 等同于
// app.use('/', express.static(path.join(__dirname,'./static')));
app.use('/public/static/.....', express.static(path.join(__dirname,'./static')));

// 自定义全局中间件，检测每个请求是否都携带了 token
app.use('/', (req, res, next)=>{
    let {token} = req.query;
    // let {token} = req.body;
    if(token) {
        next()
    } else {
        res.send('缺失token');
    }
})

// 自定义局部中间件
// app.get('/pathname', fun, fun ,fun ,....)
app.get('/article', (req, res, next)=>{
    let {author} = req.query;
    if(author === '紫月梅') {
        next()
    } else {
        res.send('文章作者不匹配');
    }
}, (req, res)=>{
    res.send({code:0, msg:{'文章一':'内容一','文章二':'内容二'}})
})


app.listen(3000, ()=>{
    console.log('server start');
})