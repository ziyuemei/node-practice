"use strict";
const nodemailer = require("nodemailer");
var randomStr = require('./random.js');

// 创建发送邮件的对象
let transporter = nodemailer.createTransport({
host: "smtp.qq.com",    //发送方邮箱：163 (通过 node_modules/nodemailer/lib/well-know/services.json)
port: 465,  //端口号
secure: true, // true for 465, false for other ports
auth: {
    user: '1769048585@qq.com', // 发送方的邮箱地址
    pass: 'jxwqlbcypxqzefed', // smtp 验证码
},
});

// 邮件信息
let mailobj = {
from: '"紫月梅🌻" <1769048585@qq.com>', // sender address
to: "1769048585@qq.com,ziyuemei999@163.com", // list of receivers
subject: "Hello ✔", // Subject line
// text: "Hello world?验证码1234", // plain text body
html: `<b>您本次的验证码是:<i style="color:skyblue;">${randomStr()}</i></b>`, // html body
};

transporter.sendMail(mailobj);