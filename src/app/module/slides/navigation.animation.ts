/**
 * MyAppIn (http://www.myappin.cz)
 *
 * @author    Tomas Hyl (tomas@hyl-design.com)
 * @copyright Copyright (c) 2017 MyAppIn, s. r. o. (http://www.myappin.cz)
 */

import { animate, animation, style } from "@angular/animations";

const defaultParams = {
  enterDuration: "233ms",
  enterTiming: "ease-out",
  leaveDuration: "233ms",
  leaveTiming: "ease-in",
  movementXaxis: "100%",
  skew: "30deg",
};

export const lightSpeedInFromLeft = animation([
  style({
    transform: "translateX(-{{movementXaxis}}) skew(-{{skew}})",
    opacity: 0
  }),
  animate("{{enterDuration}} {{enterTiming}}",
    style({
      transform: "translateX(0) skew(0)",
      opacity: 1
    })
  ),
], {
  params: defaultParams,
});

export const lightSpeedOutToLeft = animation([
  style({
    transform: "translateX(0) skew(0)",
    opacity: 1
  }),
  animate("{{leaveDuration}} {{leaveTiming}}",
    style({
      transform: "translateX(-{{movementXaxis}}) skew({{skew}})",
      opacity: 0
    })
  ),
], {
  params: defaultParams,
});

export const lightSpeedInFromRight = animation([
  style({
    transform: "translateX({{movementXaxis}}) skew({{skew}})",
    opacity: 0
  }),
  animate("{{enterDuration}} {{enterTiming}}",
    style({
      transform: "translateX(0)",
      opacity: 1
    })
  ),
], {
  params: defaultParams,
});

export const lightSpeedOutToRight = animation([
  style({
    transform: "translateX(0) skew(0)",
    opacity: 1
  }),
  animate("{{leaveDuration}} {{leaveTiming}}",
    style({
      transform: "translateX({{movementXaxis}}) skew(-{{skew}})",
      opacity: 0
    })
  ),
], {
  params: defaultParams,
});
