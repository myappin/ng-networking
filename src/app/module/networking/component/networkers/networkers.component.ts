import { Component, OnDestroy } from "@angular/core";
import { SocketIoService } from "../../service/socket-io.service";
import { INetworker } from "../../interface/networker.interface";

@Component({
  selector: "app-networkers",
  templateUrl: "./networkers.component.html",
  styleUrls: ["./networkers.component.css"],
})
export class NetworkersComponent implements OnDestroy {

  public networkers: INetworker[] = [];

  public newShown = false;

  private _subscriptions: any = [];

  public constructor (private _socketIO: SocketIoService) {
    this._socketIO.connect().then((socket: any) => {
      socket.on("networkers", (networkers: INetworker[]) => {
        this.networkers = networkers;
      });
      this._subscriptions.push(_socketIO.status.subscribe((status: boolean) => {
        if (status) {
          socket.emit("networkers");
        } else {
          this.networkers = [];
        }
      }));
      socket.emit("networkers");
    });
  }

  public ngOnDestroy (): void {
    for (const i of this._subscriptions) {
      i.unsubscribe();
    }
  }

  public addNetworker (networker: INetworker): void {
    this._socketIO.connect().then((socket: any) => {
      socket.emit("insert", networker);
    });
    this.newShown = false;
  }

  public trackByNetworker (index): boolean {
    return index;
  }

}
