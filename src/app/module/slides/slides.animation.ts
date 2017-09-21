/**
 * MyAppIn (http://www.myappin.cz)
 *
 * @author    Tomas Hyl (tomas@hyl-design.com)
 * @copyright Copyright (c) 2017 MyAppIn, s. r. o. (http://www.myappin.cz)
 */

import { animate, animation, group, query, style } from "@angular/animations";

const defaultParams = {
  enterDuration: "800ms",
  enterTiming: "ease-out",
  leaveDuration: "300ms",
  leaveTiming: "ease-in",
  movementXaxis: "377px",
  movementZaxis: "144px",
  perspective: "500px",
};

export const slidesAnimationBackward = animation([
  query(":enter",
  style({
    transform: "perspective({{perspective}}) translate3d(-{{movementXaxis}}, 0, -{{movementZaxis}})",
    opacity: 0
  }),
  {optional: true}
  ),
  query(":leave",
    style({
      transform: "translateX(0)",
      opacity: 1
    }),
    {optional: true}
  ),
  group([
    query(":enter",
      animate("{{enterDuration}} {{enterTiming}}",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      {optional: true}
    ),
    query(":leave",
      animate("{{leaveDuration}} {{leaveTiming}}",
        style({
          transform: "perspective({{perspective}}) translate3d(-{{movementXaxis}}, 0, -{{movementZaxis}})",
          opacity: 0
        })
      ),
      {optional: true}
    ),
  ]),
], {
  params: defaultParams,
});

export const slidesAnimationForward = animation([
  query(":enter",
  style({
    transform: "perspective({{perspective}}) translate3d({{movementXaxis}}, 0, -{{movementZaxis}})",
    opacity: 0
  }),
  {optional: true}),
  query(":leave",
    style({
      transform: "translateX(0)",
      opacity: 1
    }),
    {optional: true}
  ),
  group([
    query(":enter",
      animate("{{enterDuration}} {{enterTiming}}",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      {optional: true}
    ),
    query(":leave",
      animate("{{leaveDuration}} {{leaveTiming}}",
        style({
          transform: "perspective({{perspective}}) translate3d({{movementXaxis}}, 0, -{{movementZaxis}})",
          opacity: 0
        })
      ),
      {optional: true}
    ),
  ]),
], {
  params: defaultParams,
});
