var express = require('express')
var router = express.Router() //获取路由实例

// 添加用户接口
router.get('/add', (req, res)=>{
    res.send('添加成功一位新用户');
})

// 删除用户接口
router.post('/del', (req, res)=>{
    res.send('成功删除一位用户');
})

module.exports = router