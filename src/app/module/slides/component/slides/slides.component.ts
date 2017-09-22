import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
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
      transition("* => backward", [
        useAnimation(slidesAnimationBackward)
      ]),
      transition("* => forward", [
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

  public movement: "forward" | "backward" = null;

  private _subscriptions: any = [];

  public constructor(
    private _changeDetector: ChangeDetectorRef,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._subscriptions.push(_route.params.subscribe((params: any) => {
      if (!params["num"]) {
        this._router.navigate(["/slides", 1]);
      } else {
        this.currentSlide = params["num"] - 1;
      }
    }));

    document.onkeydown = (evt: any) => {
      evt = evt || window.event;
      let isLeft = false;
      if ("key" in evt) {
        isLeft = (evt.key === "ArrowLeft" || evt.key === "ArrowUp");
      } else {
        isLeft = (evt.keyCode === 37 || evt.keyCode === 38);
      }
      if (isLeft) {
        this.onPrev();
        return;
      }
      let isRight = false;
      if ("key" in evt) {
        isRight = (evt.key === "ArrowRight" || evt.key === "ArrowDown");
      } else {
        isRight = (evt.keyCode === 39 || evt.keyCode === 40);
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

  public animationDone(e: any): void {
    this.movement = null;

    this._changeDetector.markForCheck();
}

  public onNext(): void {
    if (this.movement !== null) {
      return;
    }

    this.previousSlide = this.currentSlide;

    if (++this.currentSlide > this.slides.length - 1) {
      this.currentSlide = this.slides.length - 1;
    } else {
      this._router.navigate(["/slides", this.currentSlide + 1]);
    }

    this._setMovement();
  }

  public onPrev(): void {
    if (this.movement !== null) {
      return;
    }

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
    this.movement = (this.previousSlide > this.currentSlide) ? "backward" : "forward";

    this._changeDetector.detectChanges();
  }
}
