// 范围随机数
function random(max,min){
    return Math.round(Math.random()*(max-min)+min)
}
function randomStr(codeLength){  //封装，以便日后使用。
    //创建一个空字符，用于存放随机数/字母
    var strData = ""
    //生成随机字符库 (验证码四位，随机数三种，取公倍数12,所以循环4次。也可以是120次，1200次。)
    for(var i=0;i<4;i++){
        var num = random(0,9)   //生成0-9的随机数
        var az = String.fromCharCode(random(97,122))    //生成a-z
        var AZ = String.fromCharCode(random(65,90)) //生成A-Z

        strData = strData + num + az + AZ   //将生成的字符进行字符串拼接
        
    }
    // 开始真正的随机(从随机字符库中随机取出~~自定义~~个)
    var str = ""
    for(var i=0;i<codeLength;i++){
        str += strData[random(0,strData.length-1)]
    }
    return str
}
module.exports = {
    randomStr
}