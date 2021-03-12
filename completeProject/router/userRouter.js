const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const Mail = require('../utils/mails')
const Random = require('../utils/random')
const JWT = require('../utils/jwt')

// 用户注册接口
/**
 * @api {post} /user/register 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 * @apiParam {String} ps 密码.
 * @apiParam {String} code 邮箱验证码.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
router.post('/register', (req, res) => {
    // 获取数据
    // let {us, ps, code} = req.body
    // if (!us || !ps || !code) return res.send({code: -1, msg: '参数错误'})
    // 数据处理 返回数据
    // 查询用户名是否存在，若存在则不能注册
    // console.log(codes[us], 'codes[us],', code, 'code')
    // if (codes[us] != code) return res.send({code: -4, msg: '验证码错误'})
    // 获取数据----不用邮箱
    let { us, ps, sex, age } = req.body
    if (!us || !ps) return res.send({ code: -1, msg: '参数错误' })
        // 数据处理 返回数据
        // 查询用户名是否存在，若存在则不能注册
    User.find({ us })
        .then((data) => {
            // 用户名不存在，可以注册
            if (data.length !== 0) {
                return res.send({ code: -3, msg: '用户名已存在' })
            } else {
                // 新用户插入数据库
                User.insertMany({ us, ps, sex, age })
            }
        })
        .then(() => {
            res.send({ code: 0, msg: '注册成功' })
        })
        .catch((err) => {
            res.send({ code: -2, msg: '注册失败' })
        })
})

// 用户登录接口
/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} us 用户名.
 * @apiParam {String} ps 密码.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
router.post('/login', (req, res) => {
    // 获取数据
    let { us, ps } = req.body
    if (!us || !ps) return res.send({ code: -1, msg: '参数错误' })
        // 数据处理 返回数据
        // key: 来自 Schema 对象中定义的 key 名， value：接收的参数名
    User.find({ us, ps })
        .then((data) => {
            if (data.length > 0) {
                let token = JWT.creatToken({ login: true, name: us })
                return res.send({ code: 0, msg: '登录成功', token })
            } else {
                return res.send({ code: -2, msg: '用户名或密码错误' })
            }
        })
        .catch((err) => {
            return res.send({ code: -1, msg: '内部错误' })
        })
})

// 获取邮箱验证码接口
/**
 * @api {post} /user/getMailCode 发送邮箱验证码
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} mail 邮箱验证码.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 */
let codes = {} // 保存验证码和邮箱信息
router.post('/getMailCode', (req, res) => {
    let { mail } = req.body
    if (!mail) return res.send({ code: -1, msg: '参数错误' })
    Mail.send(mail, Random.randomStr(6))
        .then(() => {
            codes[mail] = Random.randomStr(6)
            res.send({ code: 0, msg: '邮箱验证码发送成功' })
            console.log(codes, 'codes')
        })
        .catch(() => {
            res.send({ code: -1, msg: '邮箱验证码发送失败' })
        })
})

module.exports = router