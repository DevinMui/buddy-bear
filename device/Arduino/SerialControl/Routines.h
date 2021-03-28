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
const static Routine waveRoutine{waveKeyframes, sizeof(waveKeyframes) / sizeof(Keyframe)};

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
const static Routine rangeTestRoutine{rangeTestKeyframes,  sizeof(rangeTestKeyframes) / sizeof(Keyframe)};

Keyframe scanKeyframes[] = {
  Keyframe(200, KeyframeAngles::ZEROES),

  Keyframe(500, KeyframeAngles::PAN_RIGHT),
  Keyframe(500, KeyframeAngles::ZEROES),
  Keyframe(500, KeyframeAngles::PAN_LEFT),
  Keyframe(500, KeyframeAngles::ZEROES),
};
const static Routine scanRoutine{scanKeyframes, sizeof(scanKeyframes) / sizeof(Keyframe)};

Keyframe danceKeyframes[] = {
  Keyframe(200, KeyframeAngles::ZEROES),

  Keyframe(500, KeyframeAngles::WIGGLE_MID),
  Keyframe(500, KeyframeAngles::WIGGLE_RIGHT),
  Keyframe(500, KeyframeAngles::WIGGLE_MID),
  Keyframe(500, KeyframeAngles::WIGGLE_LEFT),
  Keyframe(500, KeyframeAngles::WIGGLE_MID),
  
  Keyframe(500, KeyframeAngles::ZEROES),
};
const static Routine danceRoutine{danceKeyframes, sizeof(danceKeyframes) / sizeof(Keyframe)};

#endif // ROUTINES_H
