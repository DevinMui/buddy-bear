#include <Servo.h>
#include "ServoConfiguration.h"
#include "Keyframe.h"
#include "Routines.h"

/**
   Pin number definitions
*/
const short PIN_RIGHT_PAN = 8;
const short PIN_RIGHT_TILT = 9;
const short PIN_LEFT_PAN = 10;
const short PIN_LEFT_TILT = 11;
const short PIN_HEAD_PAN = 12;
const short PIN_HEAD_TILT = 13;

const short PIN_TOUCH = 2;
const short PIN_VIBRATION = 13;

/**
   Servo initialization
*/
Servo rightPanServo, rightTiltServo, leftPanServo, leftTiltServo, headPanServo, headTiltServo;
const Servo* SERVOS[6] = {&rightPanServo, &rightTiltServo, &leftPanServo, &leftTiltServo, &headPanServo, &headTiltServo};

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
 * Run a specified routine
 */
void runRoutine(const Routine& routine) {
  auto keyframes = routine.GetKeyframes();
  auto keyframesLength = routine.GetNumKeyframes();
  for (int i = 0; i < keyframesLength; ++i) {
    auto keyframe = keyframes[i];
    Serial.print("Keyframe with duration: ");
    Serial.println(keyframe.duration);
    if (keyframe.angles != NULL) {
      glide(keyframe.angles, keyframe.duration);
    } else {
      delay(keyframe.duration);
    }
  }

  glide(KeyframeAngles::ZEROES, 1000);
}

/**
 * Setup
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

  // Default all servos to 90 degrees
  for (auto servo : SERVOS) {
    servo->write(90);
  }
}

/**
 * Loop
 */
void loop() {
  Serial.println("Rt Pan: 1\t Rt Tilt: 2\t Lt Pan: 3\t Lt Tilt: 4\t Hd Pan: 5\t Hd Tilt: 6");
  Serial.print("Enter joint to control (1-6) OR 0 for Routines: ");
  while (!Serial.available()) {}

  int jointIndex = Serial.parseInt();
  Serial.println(jointIndex);

  if (jointIndex == 0) {
    runRoutine(rangeTestRoutine);
    return;
  }

  jointIndex -= 1;

  Servo* motor = SERVOS[jointIndex];
  short min_angle = MIN_ANGLES[jointIndex];
  short max_angle = MAX_ANGLES[jointIndex];

  char buf[200];
  sprintf(buf, "Enter degrees (%d-%d): ", min_angle, max_angle);
  Serial.print(buf);
  while (!Serial.available()) {}
  int deg = Serial.parseInt();
  Serial.println(deg);

  if (deg >= 0 && deg <= 180) {
    motor->write(deg);
  } else {
    Serial.println("Invalid angle");
    return;
  }
}
