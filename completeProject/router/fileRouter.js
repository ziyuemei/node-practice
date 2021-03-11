const express = require('express')
const router = express.Router()
    // 写入文件
const fs = require('fs')
const path = require('path')

// 文件上传接口---写法1---图片上传
/**
 * @api {post} /file/upload 文件上传1
 * @apiName upload
 * @apiGroup File
 *
 * @apiParam {file} avatar 图片文件.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 * @apiSuccess {Object} data 图片路径.
 */
// 文件上传所需插件
const multer = require('multer')
const upload = multer({})

router.post('/upload', upload.single('avatar'), (req, res) => {
    let { buffer, originalname } = req.file
    let extName = originalname.split('.')[1]
    if (!['jpg', 'png', 'gif', 'ico', 'jpeg'].includes(extName)) return res.send({ code: -1, msg: '类型错误' })
    let fileName = originalname.split('.')[0]
    fs.writeFile(path.join(__dirname, '../static/images', `${fileName}.${extName}`), buffer, (err) => {
        if (!err) {
            let url = `/public/images/${originalname}`
            res.send({ code: 0, msg: '上传成功', data: url })
        } else {
            console.log(err)
            res.send({ code: -1, msg: '上传失败' })
        }
    })

})

// 文件上传接口---写法2---图片上传
/**
 * @api {post} /file/uploads 文件上传2
 * @apiName uploads
 * @apiGroup File
 *
 * @apiParam {file} avatars 图片文件.
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg 状态信息文字描述.
 * @apiSuccess {Object} data 图片路径.
 */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './static/images')
    },
    filename: function(req, file, cb) {
        // let extName = file.originalname.split('.')[1]
        // let fileName = file.originalname.split('.')[0]

        // 特例：xxx.xxx.xxx.png
        let ext = file.originalname.split('.')
        let extName = ext[ext.length - 1]
        let fileName = file.originalname.replace('.' + extName, '')
        cb(null, `${fileName}.${extName}`)
    }
})

const uploads = multer({ storage })

router.post('/uploads', uploads.single('avatars'), (req, res) => {
    let { size, originalname, path } = req.file
    if (size >= 500 * 1024) return res.send({ code: -1, msg: '尺寸过大' })
        // let extName = originalname.split('.')[1]
        // 特例：xxx.xxx.xxx.png
    let ext = originalname.split('.')
    let extName = ext[ext.length - 1]
    if (!['jpg', 'png', 'gif', 'ico', 'jpeg'].includes(extName)) return res.send({ code: -1, msg: '类型错误' })
    let url = `/public/images/${originalname}`
    res.send({ code: 0, msg: '上传成功', data: url })
})

module.exports = router