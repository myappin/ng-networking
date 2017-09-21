import { Component, OnDestroy } from "@angular/core";
import { slides } from "./slides.mock";
import { Router, ActivatedRoute } from "@angular/router";
import { trigger, transition, useAnimation } from "@angular/animations";

import { slidesAnimationBackward, slidesAnimationForward } from "../../slides.animation";
import {
  lightSpeedInFromLeft,
  lightSpeedInFromRight,
  lightSpeedOutToLeft,
  lightSpeedOutToRight,
} from "../../navigation.animation";

@Component({
  selector: "app-slides",
  templateUrl: "./slides.component.html",
  styleUrls: ["./slides.component.css"],
  animations: [
    trigger("active", [
      transition("* => backward, * => bw", [
        useAnimation(slidesAnimationBackward)
      ]),
      transition("* => forward, * => fw", [
        useAnimation(slidesAnimationForward)
      ]),
    ]),
    trigger("slideFromLeft", [
      transition(":enter", [
        useAnimation(lightSpeedInFromLeft),
      ]),
      transition(":leave", [
        useAnimation(lightSpeedOutToLeft),
      ]),
    ]),
    trigger("slideFromRight", [
      transition(":enter", [
        useAnimation(lightSpeedInFromRight),
      ]),
      transition(":leave", [
        useAnimation(lightSpeedOutToRight),
      ]),
    ]),
  ],
})
export class SlidesComponent implements OnDestroy {

  public slides = slides;

  public currentSlide = 0;

  public previousSlide = -1;

  public movement: "forward" | "fw" | "backward" | "bw" = null;

  private _subscriptions: any = [];

  public constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._subscriptions.push(_route.params.subscribe((params: any) => {
      const slideNumber = parseInt(params.num, 10);

      if (
        !slideNumber ||
        isNaN(slideNumber) ||
        slideNumber < 1
      ) {
        this._router.navigate(["/slides", 1]);
      } else if (slideNumber > slides.length) {
        this._router.navigate(["/slides", slides.length]);
      } else {
        this.currentSlide = slideNumber - 1;
      }
    }));

    document.onkeydown = (evt: any) => {
      evt = evt || window.event;
      let isLeft = false;
      if ("key" in evt) {
        isLeft = (evt.key === "ArrowLeft");
      } else {
        isLeft = (evt.keyCode === 37);
      }
      if (isLeft) {
        this.onPrev();
        return;
      }
      let isRight = false;
      if ("key" in evt) {
        isRight = (evt.key === "ArrowRight");
      } else {
        isRight = (evt.keyCode === 39);
      }
      if (isRight) {
        this.onNext();
        return;
      }
    };
  }

  public ngOnDestroy(): void {
    for (const i of this._subscriptions) {
      i.unsubscribe();
    }
  }

  public onNext(): void {
    this.previousSlide = this.currentSlide;

    if (++this.currentSlide > this.slides.length - 1) {
      this.currentSlide = this.slides.length - 1;
    } else {
      this._router.navigate(["/slides", this.currentSlide + 1]);
    }

    this._setMovement();
  }

  public onPrev(): void {
    this.previousSlide = this.currentSlide;

    if (--this.currentSlide < 0) {
      this.currentSlide = 0;
    } else {
      this._router.navigate(["/slides", this.currentSlide + 1]);
    }

    this._setMovement();
  }

  public trackSlide(index): boolean {
    return index;
  }

  private _setMovement(): void {
    if (this.previousSlide > this.currentSlide) {
      if (this.movement !== "backward") {
        this.movement = "backward";
      } else {
        this.movement = "bw";
      }
    } else {
        if (this.movement !== "forward") {
          this.movement = "forward";
        } else {
          this.movement = "fw";
        }
    }
  }
}
