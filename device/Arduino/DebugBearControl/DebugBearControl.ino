#include <Servo.h>

const short PIN_RIGHT_PAN = 8;
const short PIN_RIGHT_TILT = 9;
const short PIN_LEFT_PAN = 10;
const short PIN_LEFT_TILT = 11;
const short PIN_HEAD_PAN = 12;
const short PIN_HEAD_TILT = 13;

Servo rightPanServo;
Servo rightTiltServo;
Servo leftPanServo;
Servo leftTiltServo;
Servo headPanServo;
Servo headTiltServo;

// Right Pan Servo
const short RIGHT_PAN_MIN = 30;
const short RIGHT_PAN_MAX = 135;

// Right Tilt Servo
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
const short HEAD_PAN_MAX = 180; // Disabled for now

// Head Tilt Servo
const short HEAD_TILT_MIN = 0;
const short HEAD_TILT_MAX = 180; // Disabled for now

const short MIN_ANGLES[6] = { RIGHT_PAN_MIN, RIGHT_TILT_MIN, LEFT_PAN_MIN, LEFT_TILT_MIN, HEAD_PAN_MIN, HEAD_TILT_MIN};
const short MAX_ANGLES[6] = { RIGHT_PAN_MAX, RIGHT_TILT_MAX, LEFT_PAN_MAX, LEFT_TILT_MAX, HEAD_PAN_MAX, HEAD_TILT_MAX};
const short HOLD_ANGLE = -1; // Means to preserve existing value for motor

const Servo* SERVOS[6] = {&rightPanServo, &rightTiltServo, &leftPanServo, &leftTiltServo, &headPanServo, &headTiltServo};

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

struct Keyframe {
  int duration;
  short* angles;

  Keyframe(int d, short* a) {
    this->duration = d;
    this->angles = a;
  }
};

short zeroes[] = {90, 90, 90, 90, 90, 90};

short wave_down[] = {30, 60, -1, -1, -1, -1};
short wave_mid[] = {30, 90, -1, -1, -1, -1};
short wave_up[] = {30, 150, -1, -1, -1, -1};

short pan_right[] = {LEFT_PAN_MIN, -1, LEFT_PAN_MIN, -1, -1, -1};
short pan_left[] = {RIGHT_PAN_MAX, -1, RIGHT_PAN_MAX, -1, -1, -1};

short tilt_down[] = {-1, RIGHT_TILT_MIN, -1, LEFT_TILT_MAX, -1, -1};
short tilt_up[] = {-1, RIGHT_TILT_MAX, -1, LEFT_TILT_MIN, -1, -1};

Keyframe waveKeyframes[] = {
  Keyframe(200, zeroes),

  Keyframe(200, wave_mid),
  Keyframe(200, wave_down),
  Keyframe(200, wave_up),
  Keyframe(200, wave_down),
  Keyframe(200, wave_up),
  Keyframe(200, wave_down),
  Keyframe(200, wave_up),
  Keyframe(100, wave_mid),

  Keyframe(200, zeroes),
};
int waveKeyframesLength = sizeof(waveKeyframes) / sizeof(Keyframe);

Keyframe panKeyframes[] = {
  Keyframe(200, zeroes),

  Keyframe(500, pan_right),
  Keyframe(500, zeroes),
  Keyframe(500, pan_left),
  Keyframe(500, zeroes),

  Keyframe(500, tilt_down),
  Keyframe(500, zeroes),
  Keyframe(500, tilt_up),
  Keyframe(500, zeroes),
  
};
int panKeyframesLength = sizeof(panKeyframes) / sizeof(Keyframe);


void routine() {
  auto keyframes = panKeyframes;
  auto keyframesLength = panKeyframesLength;
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

  glide(zeroes, 1000);
}

void setup() {

  Serial.begin(9600);

  // Attach servo objects to pins
  rightPanServo.attach(PIN_RIGHT_PAN);
  rightTiltServo.attach(PIN_RIGHT_TILT);
  leftPanServo.attach(PIN_LEFT_PAN);
  leftTiltServo.attach(PIN_LEFT_TILT);
  headPanServo.attach(PIN_HEAD_PAN);
  headTiltServo.attach(PIN_HEAD_TILT);

  rightPanServo.write(90);
  rightTiltServo.write(90);
  leftPanServo.write(90);
  leftTiltServo.write(90);
  headPanServo.write(90);
  headTiltServo.write(90);

}

void loop() {
  Serial.println("Rt Pan: 1\t Rt Tilt: 2\t Lt Pan: 3\t Lt Tilt: 4\t Hd Pan: 5\t Hd Tilt: 6");
  Serial.print("Enter joint to control (1-6) OR 0 for Routines: ");
  while (!Serial.available()) {}

  int jointIndex = Serial.parseInt();
  Serial.println(jointIndex);

  if (jointIndex == 0) {
    routine();
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
