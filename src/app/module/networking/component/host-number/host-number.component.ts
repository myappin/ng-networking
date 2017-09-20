import { Component, OnDestroy } from "@angular/core";
import { SocketIoService } from "../../service/socket-io.service";

@Component({
  selector: "app-host-number",
  templateUrl: "./host-number.component.html",
  styleUrls: ["./host-number.component.css"],
})
export class HostNumberComponent implements OnDestroy {

  public usersNum = 0;

  public totalConnections = 0;

  public status = false;

  private _subscriptions: any = [];

  public constructor (private _socketIO: SocketIoService) {
    this._socketIO.connect().then((socket: any) => {
      this.status = true;
      socket.on("users", (num: any) => {
        this.usersNum = num[0];
        this.totalConnections = num[1];
      });
      this._subscriptions.push(_socketIO.status.subscribe((status: boolean) => {
        if (status) {
          socket.emit("users");
        } else {
          this.usersNum = 0;
        }
        this.status = status;
      }));
      socket.emit("users");
    });
  }

  public ngOnDestroy (): void {
    for (const i of this._subscriptions) {
      i.unsubscribe();
    }
  }

}
