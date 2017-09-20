import { Injectable } from "@angular/core";
import * as SIO from "socket.io-client/dist/socket.io.js";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SocketIoService {

  public status = new Subject<boolean>();

  private _onGoingPromise: Promise<boolean>;

  private _io: any;

  public constructor () {
    this._onGoingPromise = new Promise((resolve, reject) => {
      this._io = SIO("http://webexpo.aputime.com");
      this._io.on("connect", () => {
        this.status.next(true);
        resolve(this._io);
      });
      this._io.on("disconnect", () => {
        this.status.next(false);
      });
      this._io.on("error", () => {
        reject();
      });
    });
  }

  public connect (): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._onGoingPromise) {
        this._onGoingPromise.then((socket: any) => {
          resolve(socket);
        }).catch(() => {
          reject();
        });
      } else {
        resolve(this._io);
      }
    });
  }

}
