#ifndef KEYFRAME_H
#define KEYFRAME_H

#include "ServoConfiguration.h"

enum class KeyframeAngles {
  ZEROES,
  WAVE_DOWN,
  WAVE_MID,
  WAVE_UP,
  PAN_RIGHT,
  PAN_LEFT,
  TILT_DOWN,
  TILT_UP
};

struct Keyframe {
  int duration;
  short* angles;

  Keyframe(int d, short* a) {
    this->duration = d;
    this->angles = a;
  }

  const short zeroes[6] = {90, 90, 90, 90, 90, 90};

  Keyframe(int d, KeyframeAngles a) {
    this->duration = d;

    switch (a) {
      case KeyframeAngles::ZEROES: {
//          this->angles = short[]{90, 90, 90, 90, 90, 90};
        } break;

      case KeyframeAngles::WAVE_DOWN: {
//          this->angles =  {30, 60, -1, -1, -1, -1};
        } break;
      case KeyframeAngles::WAVE_MID: {
//          this->angles =  {30, 90, -1, -1, -1, -1};
        } break;
      case KeyframeAngles::WAVE_UP: {
//          this->angles =  {30, 150, -1, -1, -1, -1};
        } break;

      case KeyframeAngles::PAN_RIGHT: {
//          this->angles = {LEFT_PAN_MIN, -1, LEFT_PAN_MIN, -1, -1, -1};
        } break;
      case KeyframeAngles::PAN_LEFT: {
//          this->angles = {RIGHT_PAN_MAX, -1, RIGHT_PAN_MAX, -1, -1, -1};
        } break;

      case KeyframeAngles::TILT_DOWN: {
//          this->angles = { -1, RIGHT_TILT_MIN, -1, LEFT_TILT_MAX, -1, -1};
        } break;
      case KeyframeAngles::TILT_UP: {
//          this->angles = { -1, RIGHT_TILT_MAX, -1, LEFT_TILT_MIN, -1, -1};
        } break;

      default: {
          // Failed to find the keyframe!
          this->angles = NULL;
        }
    }
    this->angles = zeroes;
  }
};



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
