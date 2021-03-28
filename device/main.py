#!/usr/bin/env python
import socketio
import time
import serial
import threading

ARDUINO_TIMEOUT = 2

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

def send_arduino_command(command):
    ser.write(command)
    ack = ser.readline(ARDUINO_TIMEOUT)
    if ack != ARDUINO_ACK_SUCCESS:
        print(f"Arduino failed to acknowledge! \nCommand: {command} \nReceived: {ack}")
        return False
    return True

def handle_arduino_notification(notification):
    if notification == ARDUINO_NOTIFICATION_BUTTON:
        handle_event(EVENT_BUTTON)
    else:
        print(f"Arduino sent unknown notification! \nNotification: {notification}")
        return False
    
    return True

def handle_event(event):
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

def main():
    ser = serial.Serial(
        port='/dev/ttyACM0', 
        baudrate = 9600,
        parity=serial.PARITY_NONE,
        stopbits=serial.STOPBITS_ONE,
        bytesize=serial.EIGHTBITS,
        timeout=1
    )

    sio = socketio.Client()
    sio.connect('http://192.168.0.20:5000')

    current_state = STATE_OFF
    lock = threading.Lock()

    while True:
        if ser.in_waiting():
            notification = ser.readline(ARDUINO_TIMEOUT)
            handle_arduino_notification(notification)
        else:
            handle_event(EVENT_IDLE)

        time.sleep(0.25)

if __name__ == "__main__":
    main()
