#ifndef ROUTINES_H
#define ROUTINES_H

#include "Keyframe.h"

Keyframe waveKeyframes[] = {
  Keyframe(200, KeyframeAngles::ZEROES),

  Keyframe(200, KeyframeAngles::WAVE_MID),
  Keyframe(200, KeyframeAngles::WAVE_DOWN),
  Keyframe(200, KeyframeAngles::WAVE_UP),
  Keyframe(200, KeyframeAngles::WAVE_DOWN),
  Keyframe(200, KeyframeAngles::WAVE_UP),
  Keyframe(200, KeyframeAngles::WAVE_DOWN),
  Keyframe(200, KeyframeAngles::WAVE_UP),
  Keyframe(100, KeyframeAngles::WAVE_MID),

  Keyframe(200, KeyframeAngles::ZEROES),
};
int waveKeyframesLength = sizeof(waveKeyframes) / sizeof(Keyframe);
const static Routine waveRoutine{waveKeyframes, waveKeyframesLength};

Keyframe rangeTestKeyframes[] = {
  Keyframe(200, KeyframeAngles::ZEROES),

  Keyframe(500, KeyframeAngles::PAN_RIGHT),
  Keyframe(500, KeyframeAngles::ZEROES),
  Keyframe(500, KeyframeAngles::PAN_LEFT),
  Keyframe(500, KeyframeAngles::ZEROES),
  
  Keyframe(500, KeyframeAngles::TILT_DOWN),
  Keyframe(500, KeyframeAngles::ZEROES),
  Keyframe(700, KeyframeAngles::TILT_UP),
  Keyframe(700, KeyframeAngles::ZEROES),
};
int rangeTestKeyframesLength = sizeof(rangeTestKeyframes) / sizeof(Keyframe);
const static Routine rangeTestRoutine{rangeTestKeyframes, rangeTestKeyframesLength};

#endif // ROUTINES_H
