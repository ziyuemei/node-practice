const express = require('express')
const router = express.Router()
const FoodModel = require('../db/model/foodModel')

// 添加食物接口
/**
 * @api {post} /food/add 添加菜品
 * @apiName addFood
 * @apiGroup Food
 *
 * @apiParam {String} name 菜品名称.
 * @apiParam {Number} price 菜品价格.
 * @apiParam {String} desc 对菜品的描述.
 * @apiParam {String} typeName 对菜品类别标签.
 * @apiParam {Number} typeId 菜品标签id
 * @apiParam {String} img 菜品图片.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
router.post('/add', (req, res) => {
    let {name, price, desc, typeName, typeId, img} = req.body
    FoodModel.insertMany({name, price, desc, typeName, typeId, img})
    .then((data) => {
        res.send({code: 0, msg: '添加成功'})
    })
    .catch((err) => {
        console.log(err, 'err,')
        res.send({code: -1, msg: '添加失败'})
    })
})

// 分类查询食物接口
/**
 * @api {get} /food/getInfoByType 分类查询菜品
 * @apiName getInfoByType
 * @apiGroup Food
 *
 * @apiParam {Number} typeId 菜品标签id
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 * @apiSuccess {Object} data 数据列表.
 */
router.get('/getInfoByType', (req, res) => {
    let {typeId} = req.query
    FoodModel.find({typeId})
    .then((data) => {
        res.send({code: 0, msg: '查询成功', data})
    })
    .catch(() => {
        res.send({code: -1, msg: '查询失败'})
    })
})

// 模糊查询食物接口
/**
 * @api {get} /food/getInfoByKeyWord 模糊查询菜品
 * @apiName getInfoByKeyWord
 * @apiGroup Food
 *
 * @apiParam {String} keyWord 模糊关键字
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 * @apiSuccess {Object} data 数据列表.
 */
router.get('/getInfoByKeyWord', (req, res) => {
    let {keyWord} = req.query
    let reg = new RegExp(keyWord) // 匹配关键字
    // FoodModel.find({name: {$regex: reg}})  // 名字模糊
    FoodModel.find({$or: [{name: {$regex: reg}}, {desc: {$regex: reg}}]}) // 名字或者描述模糊
    .then((data) => {
        res.send({code: 0, msg: '查询成功', data})
    })
    .catch(() => {
        res.send({code: -1, msg: '查询失败'})
    })
})

// 删除菜品
/**
 * @api {post} /food/delete 删除菜品
 * @apiName delete
 * @apiGroup Food
 *
 * @apiParam {Number} _id 菜品id.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
router.post('/delete', (req, res) => {
    let {_id} = req.body
    FoodModel.remove({_id}) // 删除一个
    // FoodModel.remove({_id: [...ids.split(",")]}) // 批量删除
    .then((data) => {
        res.send({code: 0, msg: '删除成功'})
    })
    .catch(() => {
        res.send({code: -1, msg: '删除失败'})
    })
})

// 修改食物接口
/**
 * @api {post} /food/updata 修改菜品
 * @apiName updata
 * @apiGroup Food
 *
 * @apiParam {String} name 菜品名称.
 * @apiParam {Number} price 菜品价格.
 * @apiParam {String} desc 对菜品的描述.
 * @apiParam {String} typeName 对菜品类别标签.
 * @apiParam {Number} typeId 菜品标签id
 * @apiParam {String} img 菜品图片.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
router.post('/updata', (req, res) => {
    let {name, price, desc, typeName, typeId, img, _id} = req.body
    FoodModel.update({_id}, {name, price, desc, typeName, typeId, img})
    .then((data) => {
        res.send({code: 0, msg: '修改成功'})
    })
    .catch(() => {
        res.send({code: -1, msg: '删除失败'})
    })
})

// 菜品分页
/**
 * @api {get} /food/getInfoByPage 菜品分页查询
 * @apiName getInfoByPage
 * @apiGroup Food
 *
 * @apiParam {Number} pageSize 每页条数.
 * @apiParam {Number} page 第几页.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
router.get('/getInfoByPage', (req, res) => {
    let pageSize = req.query.pageSize || 5
    let page = req.query.page || 1
    FoodModel.find().limit(Number(pageSize)).skip(Number((page -1) * pageSize))
    .then((data) => {
        res.send({code: 0, msg: '查询成功', count: data.length, data})
    })
    .catch(() => {
        res.send({code: -1, msg: '查询失败'})
    })
})

module.exports = router