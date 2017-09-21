import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public title = "Networking";

  public networkersShown = false;

  public registeredCount = 0;

  public constructor() {
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

  public toggleNetworkers(): void {
    this.networkersShown = !this.networkersShown;
  }
}
