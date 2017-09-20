import { Component } from "@angular/core";
import { transition, style, animate, trigger } from "@angular/animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger(
      "active", [
        transition(":enter", [
          style({transform: "translateX(-100%)", opacity: 0.5}),
          animate("500ms ease-in-out", style({transform: "translateX(0)", opacity: 1})),
        ]),
        transition(":leave", [
          style({transform: "translateX(0)", opacity: 1}),
          animate("500ms ease-in-out", style({transform: "translateX(-100%)", opacity: 0.5})),
        ]),
      ]),
  ],
})
export class AppComponent {
  public title = "Networking";

  public networkersShown = false;

  public constructor () {
    document.onkeydown = (evt: any) => {
      evt = evt || window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        this.networkersShown = false;
      }
    };
  }

  public toggleNetworkers (): void {
    this.networkersShown = !this.networkersShown;
  }
}
