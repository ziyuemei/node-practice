const jwt = require('jsonwebtoken');
// 创建私钥
const scrict = 'suijizifuchuan.jiuxingle'

// 产生token
function creatToken(playload) {
    return jwt.sign(playload, scrict, {
        expiresIn: '8h' // "2 days" --- 两天, "10h"----- 10小时, "7d"----7天， 60*60*1 ---- 1小时（数值单位是秒）， '120' ---- 120毫秒，（字符串单位是毫秒）
    })
}

// 验证token
function checkToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, scrict, (err, data) => {
            if (err) {
                switch (err.name) {
                    case 'JsonWebTokenError':
                        reject({ code: -1, msg: '无效的token' });
                        break;
                    case 'TokenExpiredError':
                        reject({ code: -1, msg: 'token过期' });
                        break;
                }
            }
            resolve(data)
        })
    })
}

module.exports = {
    creatToken,
    checkToken
}