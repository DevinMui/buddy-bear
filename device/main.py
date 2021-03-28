import socketio

def main():
    sio = socketio.Client()

    @sio.event
    def connect():
        print('connection established')

    @sio.event
    def my_message(data):
        print('message received with ', data)
        sio.emit('my response', {'response': 'my response'})

    @sio.event
    def disconnect():
        print('disconnected from server')

    sio.connect('http://192.168.0.20:5000)
    sio.emit("join", "hi")
    sio.wait()

if __name__ == "__main__":
    main()
