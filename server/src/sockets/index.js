module.exports = function (io) {
    io.sockets.on('connection', (socket) => {
        console.log('connected')

        socket.on('join', (data) => {
            socket.join(`bear/${data.id}`)
            console.log("join")
        })

        socket.on('scan', (data) => {
            io.in(`bear/${data.id}`).emit('scan', {})
            console.log("scan")
        })

        socket.on('reward', (data) => {
            io.in(`bear/${data.id}`).emit('reward', {})
            console.log("rewarrd")
        })
    })
}
