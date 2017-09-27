import { Component, Input, ViewChild, ElementRef, AfterViewChecked } from "@angular/core";
import { ISlide } from "../../interface/slide.interface";

@Component({
  selector: "app-slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.css"],
})
export class SlideComponent implements AfterViewChecked {

  @Input()
  public slide: ISlide;

  @Input()
  public index: number;

  @ViewChild("innerHtml")
  public innerHtml: ElementRef;

  private _checked = false;

  public constructor() {
  }

  public ngAfterViewChecked(): void {
    if (!this._checked && this.slide.innerHtml) {
      this._checked = true;
      if (this.innerHtml && this.innerHtml.nativeElement) {
        this.innerHtml.nativeElement.innerHTML = this.slide.innerHtml;
      }
    }
  }

}
