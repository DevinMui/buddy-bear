#!/usr/bin/env python
import socketio
import time
import serial

ser = serial.Serial(
        port='/dev/ttyACM0', 
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
)

sio = socketio.Client()

ARDUINO_TIMEOUT = 2

def send_arduino_command(command):
    ser.write(command)
    ser.readline(ARDUINO_TIMEOUT)

def scan_page():
    send_arduino_command("SCAN")

def wave():
    send_arduino_command("WAVE")

def dance():
    send_arduino_command("DANCE")

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

def main():
    text = ser.readline()
    print(f"Arduino sent: {text}")

    ser.close()

    sio.connect('http://192.168.0.20:5000')
    sio.emit("join", "hi")
    sio.wait()

if __name__ == "__main__":
    main()
