#!/usr/bin/env python
import socketio
import time
import serial
import threading

ARDUINO_TIMEOUT = 100

ARDUINO_ACK_SUCCESS = "ACK_SUCCESS"
ARDUINO_ACK_FAILURE = "ACK_FAILURE"

ARDUINO_COMMAND_SCAN = "CMD_SCAN"
ARDUINO_COMMAND_WAVE = "CMD_WAVE"
ARDUINO_COMMAND_DANCE = "CMD_DANCE" 
ARDUINO_COMMAND_BUZZ = "CMD_BUZZ"
ARDUINO_COMMAND_BUZZ_LONG = "CMD_BUZZ_LONG"

ARDUINO_NOTIFICATION_BUTTON = "NTF_BUTTON"

STATE_OFF = "STATE_OFF"
STATE_READING = "STATE_READING"

EVENT_IDLE = "EVENT_IDLE"
EVENT_BUTTON = "EVENT_BUTTON"
EVENT_FINISHED = "EVENT_FINISHED"

sio = socketio.Client()
@sio.event
def connect():
    print('Connected to socket')

@sio.event
def reward(data):
    print('Received reward with data:', data)
    handle_event(EVENT_FINISHED)

@sio.event
def disconnect():
    print('Disconnected from socket')


ser = serial.Serial(
    port='/dev/ttyACM0', 
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)    

current_state = STATE_OFF
lock = threading.Lock()

def send_arduino_command(command):
    command = command.encode("utf-8")
    ser.write(command)
    ack = b""
    while ack == b"":
        ack = ser.readline(ARDUINO_TIMEOUT)

    ack = ack.decode("utf-8")
    if ARDUINO_ACK_SUCCESS not in ack:
        print(f"Arduino failed to acknowledge! \nCommand: {command} \nReceived: {ack} \nExpected: {ack}")
        return False
    return True

def handle_arduino_notification(notification):
    notification = notification.decode("utf-8")
    if ARDUINO_NOTIFICATION_BUTTON in notification:
        handle_event(EVENT_BUTTON)
    else:
        print(f"Arduino sent unknown notification! \nNotification: {notification}")
        return False
    
    return True

def handle_event(event):
    global current_state
    with lock:
        def log_unexpected_event():
            print(f"Unexpected event! Received {event} while in state {current_state}")
            return False

        next_state = current_state
        if event == EVENT_BUTTON:
            if current_state == STATE_OFF: 
                # If currently off, turn bear on and wave
                send_arduino_command(ARDUINO_COMMAND_BUZZ_LONG)
                send_arduino_command(ARDUINO_COMMAND_WAVE)

                # Transition to reading state next
                next_state = STATE_READING

            elif current_state == STATE_READING:
                # If currently reading, scan new page
                send_arduino_command(ARDUINO_COMMAND_BUZZ)
                send_arduino_command(ARDUINO_COMMAND_SCAN)
            
            else:
                log_unexpected_event()
        
        elif event == EVENT_FINISHED:
            if current_state == STATE_READING:
                # If currently reading, perform a celebration
                send_arduino_command(ARDUINO_COMMAND_DANCE)

                # Transition to off state next
                next_state = STATE_OFF
            else:
                log_unexpected_event()
        
        elif event == EVENT_IDLE:
            # Currently do nothing on idle event
            pass
            
        # Transition to next state
        current_state = next_state
        return True

def main():
    

    sio.connect('http://192.168.0.20:5000')

    while True:
        notification = ser.readline(ARDUINO_TIMEOUT)
        if notification == b"": # Check if bytes are waiting to be read
            handle_event(EVENT_IDLE)
        else:
            handle_arduino_notification(notification)

if __name__ == "__main__":
    main()
