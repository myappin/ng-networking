import { Component, Input } from "@angular/core";
import { ISlide } from "../../interface/slide.interface";

@Component({
  selector: "app-slide",
  templateUrl: "./slide.component.html",
  styleUrls: ["./slide.component.css"],
})
export class SlideComponent {

  @Input()
  public slide: ISlide;

  @Input()
  public index: number;

  constructor () {
  }

}
