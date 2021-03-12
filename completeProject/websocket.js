const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 8080 }, () => {
    console.log('websocket服务已启动')
})
let clients = '';
ws.on('connection', (client) => {
    console.log('已连接')
    clients = client;
    client.send('欢迎光临') // 只能传输字符串
    client.on('message', (msg) => {
        console.log('前端发来的信息：' + msg)
        if (msg) {
            sendMsg()
        }
    })
    client.on('close', () => {
        console.log('前端主动断开了')
        clearInterval(timer);
        count = 0;
    })
})
let count = 0;
let timer = null;

function sendMsg() {
    timer = setInterval(() => {
        clients.send(count++ + '0')
    }, 1000);
}