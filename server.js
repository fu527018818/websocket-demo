const Socket = require('ws')
//创建一个服务器端 监听
var socket = new Socket.Server({
    port: 8888
})
var index = 0
var clients = [] //客户端集合的数组
//监听链接建立(客户端连接上此服务器)
socket.on('connection', function (client) {
    console.log("客户端连接成功")
    //接收到消息之后
    // console.log(client)
    //为连接成功的客户端添加接受消息事件
    client.on('message', function (data) {
        console.log(data)
        clients.forEach(function (c) {
            try {
                if(c!=client){ //向不等于当前客户端的客户端发送消息
                    c.send(data)
                }     
                // c.send(data)           
            }
            catch (err) {
                console.log("客户端不存在")
            }
            // c.close()
        })
    })
    clients.push(client)
})
// setInterval(function () {
//     index += 1
//     clients.forEach(function(client){
//         try{
//             client.send(`服务器端进行消息广播...第${index}次！`)
//         }
//         catch(err){
//             console.log(err)
//         }
//     })
// }, 2000)
