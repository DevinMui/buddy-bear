#include <Servo.h>
#include <AceButton.h>
using namespace ace_button;

#include "ServoConfiguration.h"
#include "Keyframe.h"
#include "Routines.h"
#include "SerialProtocol.h"

/**
   Pin number definitions
*/
const short PIN_RIGHT_PAN = 8;
const short PIN_RIGHT_TILT = 9;
const short PIN_LEFT_PAN = 10;
const short PIN_LEFT_TILT = 11;
const short PIN_HEAD_PAN = 12;
const short PIN_HEAD_TILT = 13;

const short PIN_VIBRATION = 2;
const short PIN_TOUCH = 3;

/**
   Device initialization
*/
Servo rightPanServo, rightTiltServo, leftPanServo, leftTiltServo, headPanServo, headTiltServo;
const Servo* SERVOS[6] = {&rightPanServo, &rightTiltServo, &leftPanServo, &leftTiltServo, &headPanServo, &headTiltServo};

AceButton button{PIN_TOUCH};

/**
   Move all servos based on desired angles, synchronized to take specified durations
*/
void glide(short* targetAngles, int duration, int step = 10) {
  float currentAngles[6];
  float stepSizes[6];

  // Confirm valid input angles
  if (!inBounds(targetAngles)) {
    Serial.println("Bad angles! Aborting glide move.");
    return;
  }

  // Calculate per-iteration step sizes per motor
  int numSteps = duration / step;
  for (int i = 0; i < 6; ++i) {
    currentAngles[i] = SERVOS[i]->read();
    if (targetAngles[i] == HOLD_ANGLE) {
      stepSizes[i] = 0; // To hold angle, make increment 0
    } else {
      stepSizes[i] = (targetAngles[i] - currentAngles[i]) / numSteps;
    }
  }

  // Update motor values for each step
  for (int s = 0; s < numSteps; ++s) {
    for (int i = 0; i < 6; ++i) {
      currentAngles[i] += stepSizes[i];
      SERVOS[i]->write(round(currentAngles[i]));
    }
    delay(step);
  }

  // Ensure final values are exactly equal to desired values
  for (int i = 0; i < 6; ++i) {
    if (targetAngles[i] != HOLD_ANGLE) {
      SERVOS[i]->write(targetAngles[i]);
    }
  }
}

/**
   Run a specified routine
*/
void runRoutine(const Routine& routine) {
  auto keyframes = routine.GetKeyframes();
  auto keyframesLength = routine.GetNumKeyframes();
  for (int i = 0; i < keyframesLength; ++i) {
    auto keyframe = keyframes[i];
    if (keyframe.angles != NULL) {
      glide(keyframe.angles, keyframe.duration);
    } else {
      delay(keyframe.duration);
    }
  }

  glide(KeyframeAngles::ZEROES, 1000);
}

void sendMessage(String msg) {
  Serial.println(msg);
}

void handleButton(AceButton* button, uint8_t eventType, uint8_t buttonState) {
  switch (eventType) {
    case AceButton::kEventPressed:
      sendMessage(ARDUINO_NOTIFICATION_BUTTON);
      break;
  }
}

/**
   Setup
*/
void setup() {

  Serial.begin(9600);

  // Attach servo objects to pins
  rightPanServo.attach(PIN_RIGHT_PAN);
  rightTiltServo.attach(PIN_RIGHT_TILT);
  leftPanServo.attach(PIN_LEFT_PAN);
  leftTiltServo.attach(PIN_LEFT_TILT);
  headPanServo.attach(PIN_HEAD_PAN);
  headTiltServo.attach(PIN_HEAD_TILT);

  // Set up vibration motor
  pinMode(PIN_VIBRATION, OUTPUT);

  // Set up capacitive touch sensor
  pinMode(PIN_TOUCH, INPUT);
  button.setEventHandler(handleButton);

  // Default all servos to 90 degrees
  for (auto servo : SERVOS) {
    servo->write(90);
  }
}

/**
   Loop
*/
void loop() {
  button.check();
  if (Serial.available()) {
    String command = Serial.readString();

    if (ARDUINO_COMMAND_SCAN.equals(command)) {
      sendMessage(ARDUINO_ACK_SUCCESS);
      runRoutine(scanRoutine);

    } else if (ARDUINO_COMMAND_WAVE.equals(command)) {
      sendMessage(ARDUINO_ACK_SUCCESS);
      runRoutine(waveRoutine);

    } else if (ARDUINO_COMMAND_DANCE.equals(command)) {
      sendMessage(ARDUINO_ACK_SUCCESS);
      runRoutine(danceRoutine);

    } else if (ARDUINO_COMMAND_BUZZ.equals(command)) {
      sendMessage(ARDUINO_ACK_SUCCESS);
      digitalWrite(PIN_VIBRATION, HIGH);
      delay(250);
      digitalWrite(PIN_VIBRATION, LOW);

    } else if (ARDUINO_COMMAND_BUZZ_LONG.equals(command)) {
      sendMessage(ARDUINO_ACK_SUCCESS);
      digitalWrite(PIN_VIBRATION, HIGH);
      delay(750);
      digitalWrite(PIN_VIBRATION, LOW);

    } else {
      // Didn't recognize the command!
      sendMessage(ARDUINO_ACK_FAILURE);
    }
  }
}
