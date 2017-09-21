import { Component, OnDestroy, EventEmitter, Output, Input } from "@angular/core";
import { SocketIoService } from "../../service/socket-io.service";
import { INetworker } from "../../interface/networker.interface";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-networkers",
  templateUrl: "./networkers.component.html",
  styleUrls: ["./networkers.component.css"],
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
    trigger(
      "activeNew", [
        transition(":enter", [
          style({transform: "scale(0)", opacity: 0}),
          animate("300ms ease-in-out", style({transform: "scale(1)", opacity: 1})),
        ]),
        transition(":leave", [
          style({transform: "scale(1)", display: "block"}),
          animate("300ms ease-in-out", style({transform: "scale(0)", opacity: 0})),
        ]),
      ]),
  ],
})
export class NetworkersComponent implements OnDestroy {
  @Input()
  public shown = false;

  @Output()
  public onNetworkers = new EventEmitter<number>();

  public networkers: INetworker[] = [];

  public newShown = false;

  private _subscriptions: any = [];

  public constructor(private _socketIO: SocketIoService) {
    this._socketIO.connect().then((socket: any) => {
      socket.on("networkers", (networkers: INetworker[]) => {
        this.networkers = networkers;
        this.onNetworkers.emit(this.networkers.length);
      });
      this._subscriptions.push(_socketIO.status.subscribe((status: boolean) => {
        if (status) {
          socket.emit("networkers");
        } else {
          this.networkers = [];
          this.onNetworkers.emit(0);
        }
      }));
      socket.emit("networkers");
    });
  }

  public ngOnDestroy(): void {
    for (const i of this._subscriptions) {
      i.unsubscribe();
    }
  }

  public addNetworker(networker: INetworker): void {
    this._socketIO.connect().then((socket: any) => {
      socket.emit("insert", networker);
    });
    this.newShown = false;
  }

  public trackByNetworker(index): boolean {
    return index;
  }

}
