#ifndef SERVO_CONFIGURATION_H
#define SERVO_CONFIGURATION_H

// Right Pan Servo Limits
const short RIGHT_PAN_MIN = 30;
const short RIGHT_PAN_MAX = 135;

// Right Tilt Servo Limits
const short RIGHT_TILT_MIN = 60;
const short RIGHT_TILT_MAX = 150;

// Left Pan Servo
const short LEFT_PAN_MIN = 45;
const short LEFT_PAN_MAX = 150;

// Left Tilt Servo
const short LEFT_TILT_MIN = 30;
const short LEFT_TILT_MAX = 120;

// Head Pan Servo
const short HEAD_PAN_MIN = 0;
const short HEAD_PAN_MAX = 180; // Unused for now

// Head Tilt Servo
const short HEAD_TILT_MIN = 0;
const short HEAD_TILT_MAX = 180; // Unused for now

const short MIN_ANGLES[6] = { RIGHT_PAN_MIN, RIGHT_TILT_MIN, LEFT_PAN_MIN, LEFT_TILT_MIN, HEAD_PAN_MIN, HEAD_TILT_MIN};
const short MAX_ANGLES[6] = { RIGHT_PAN_MAX, RIGHT_TILT_MAX, LEFT_PAN_MAX, LEFT_TILT_MAX, HEAD_PAN_MAX, HEAD_TILT_MAX};
const short HOLD_ANGLE = -1; // Means to preserve existing value for motor

/**
 * Checks to see whether an input array of target angles are all in bounds for their respective motors.
 */
bool inBounds(short* targetAngles) {
  char buf[200];
  bool success = true;
  for (int i = 0; i < 6; ++i) {
    if (targetAngles[i] == HOLD_ANGLE) {
      // This special value means to hold the current angle, so is always in bounds
      continue;
    } else if (targetAngles[i] < MIN_ANGLES[i]) {
      sprintf(buf, "Desired angle %d is below min angle %d for motor %d", targetAngles[i], MIN_ANGLES[i], i);
      Serial.println(buf);
      success = false;
    } else if (targetAngles[i] > MAX_ANGLES[i]) {
      sprintf(buf, "Desired angle %d is above max angle %d for motor %d", targetAngles[i], MAX_ANGLES[i], i);
      Serial.println(buf);
      success = false;
    }
  }
  return success;
}

#endif // SERVO_CONFIGURATION_H
