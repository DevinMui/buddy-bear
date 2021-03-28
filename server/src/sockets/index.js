module.exports = function (io) {
    io.sockets.on('connection', (socket) => {
        console.log('connected')

        socket.on('join', (data) => {
            console.log('Join request recieved!')
            socket.join(`bear/${data.id}`)
        })

        socket.on('scan', (data) => {
            console.log('Scan request recieved!')
            io.in(`bear/${data.id}`).emit('scan', {})
        })

        socket.on('reward', (data) => {
            console.log('Reward request recieved!')
            io.in(`bear/${data.id}`).emit('reward', {})
        })
    })
}
