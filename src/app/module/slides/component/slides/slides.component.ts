import { Component, OnDestroy } from "@angular/core";
import { slides } from "./slides.mock";
import { Router, ActivatedRoute } from "@angular/router";
import { trigger, style, animate, transition } from "@angular/animations";

@Component({
  selector: "app-slides",
  templateUrl: "./slides.component.html",
  styleUrls: ["./slides.component.css"],
  animations: [
    trigger(
      "active", [
        transition(":enter", [
          style({transform: "translateX(-10%)", opacity: 0}),
          animate("500ms ease-in-out", style({transform: "translateX(0)", opacity: 1})),
        ]),
        transition(":leave", [
          style({transform: "translateX(0)", opacity: 1}),
          animate("500ms ease-in-out", style({transform: "translateX(-10%)", opacity: 0})),
        ]),
      ]),
  ],
})
export class SlidesComponent implements OnDestroy {

  public slides = slides;

  public actualSlide = 0;

  private _subscriptions: any = [];

  public constructor (private _router: Router, _route: ActivatedRoute) {
    this._subscriptions.push(_route.params.subscribe((params: any) => {
      if (!params["num"]) {
        this._router.navigate(["/slides", 1]);
      } else {
        this.actualSlide = params["num"] - 1;
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

  public ngOnDestroy (): void {
    for (const i of this._subscriptions) {
      i.unsubscribe();
    }
  }

  public onNext (): void {
    if (++this.actualSlide > this.slides.length - 1) {
      this.actualSlide = this.slides.length - 1;
    } else {
      this._router.navigate(["/slides", this.actualSlide + 1]);
    }
  }

  public onPrev (): void {
    if (--this.actualSlide < 0) {
      this.actualSlide = 0;
    } else {
      this._router.navigate(["/slides", this.actualSlide + 1]);
    }
  }

  public trackSlide (index): boolean {
    return index;
  }

}
