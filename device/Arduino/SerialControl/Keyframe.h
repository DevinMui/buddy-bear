#ifndef KEYFRAME_H
#define KEYFRAME_H

#include "ServoConfiguration.h"

struct Keyframe {
  int duration;
  short* angles;

  Keyframe(int d, short* a) {
    this->duration = d;
    this->angles = a;
  }

};

class KeyframeAngles {
  public:
    const static short ZEROES[6];

    const static short WAVE_DOWN[6];
    const static short WAVE_MID[6];
    const static short WAVE_UP[6];

    const static short PAN_RIGHT[6];
    const static short PAN_LEFT[6];

    const static short TILT_DOWN[6];
    const static short TILT_UP[6];

    const static short WIGGLE_LEFT[6];
    const static short WIGGLE_MID[6];
    const static short WIGGLE_RIGHT[6];
};

const static short KeyframeAngles::ZEROES[] {90, 90, 90, 90, 90, 90};
const static short KeyframeAngles::WAVE_DOWN[] {30, 60, -1, -1, -1, -1};
const static short KeyframeAngles::WAVE_MID[] {30, 90, -1, -1, -1, -1};
const static short KeyframeAngles::WAVE_UP[] {30, 150, -1, -1, -1, -1};
const static short KeyframeAngles::PAN_RIGHT[] {LEFT_PAN_MIN, -1, LEFT_PAN_MIN, -1, -1, -1};
const static short KeyframeAngles::PAN_LEFT[] {RIGHT_PAN_MAX, -1, RIGHT_PAN_MAX, -1, -1, -1};
const static short KeyframeAngles::TILT_DOWN[] { -1, RIGHT_TILT_MIN, -1, LEFT_TILT_MAX, -1, -1};
const static short KeyframeAngles::TILT_UP[] { -1, RIGHT_TILT_MAX, -1, LEFT_TILT_MIN, -1, -1};
const static short KeyframeAngles::WIGGLE_LEFT[] {RIGHT_PAN_MIN, RIGHT_TILT_MIN, LEFT_PAN_MAX, LEFT_TILT_MIN, -1, -1};
const static short KeyframeAngles::WIGGLE_MID[] {RIGHT_PAN_MIN, 90, LEFT_PAN_MAX, 90, -1, -1};
const static short KeyframeAngles::WIGGLE_RIGHT[] {RIGHT_PAN_MIN, RIGHT_TILT_MAX, LEFT_PAN_MAX, LEFT_TILT_MAX, -1, -1};


class Routine {
  public:
    Routine(Keyframe* keyframes, int numKeyframes) : keyframes_{keyframes}, numKeyframes_{numKeyframes} {}

    const Keyframe* GetKeyframes() {
      return keyframes_;
    }
    int GetNumKeyframes() {
      return numKeyframes_;
    }

  private:
    Keyframe* keyframes_;
    int numKeyframes_;
    long duration_;
};


#endif // KEYFRAME_H
