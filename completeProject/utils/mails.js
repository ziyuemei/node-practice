const nodemailer = require("nodemailer")

// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
host: "smtp.qq.com",    //发送方邮箱：qq (通过 node_modules/nodemailer/lib/well-know/services.json)
port: 465,  //端口号
secure: true, // true for 465, false for other ports
auth: {
    user: '1769048585@qq.com', // 发送方的邮箱地址
    pass: 'jxwqlbcypxqzefed', // smtp 验证码
},
})

function send(mail, code) {
    // 邮件信息
    let mailobj = {
        from: '"紫月梅🌻" <1769048585@qq.com>', // sender address
        to: mail, // list of receivers
        subject: "Hello ✔", // Subject line
        // text: "Hello world?验证码1234", // plain text body
        html: `<b>您本次的验证码是： <i style="color:skyblue;">${code}</i></b> `, // html body
    }
    return new Promise((resolve, reject) => {
        // 发送邮件
        transporter.sendMail(mailobj, (err, data) => {
            if (err) {
                reject()
            } else {
                resolve()
            }
        })
    })
}

module.exports = {
    send
}
