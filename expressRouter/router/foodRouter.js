var express = require('express')
var router = express.Router()

// 添加一种新事物接口
router.get('/add', (req, res)=>{
  res.send('成功添加一种新食物')
})

module.exports = router