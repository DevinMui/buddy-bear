module.exports = function (io) {
    io.sockets.on('connection', (socket) => {
        console.log('connected')

        socket.on('join', (data) => {
            socket.join(`bear/${data.id}`)
        })

        socket.on('scan', (data) => {
            io.in(`bear/${data.id}`).emit('scan', {})
        })

        socket.on('reward', (data) => {
            io.in(`bear/${data.id}`).emit('reward', {})
        })
    })
}
