import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { HostNumberComponent } from "./component/host-number/host-number.component";
import { NetworkersComponent } from "./component/networkers/networkers.component";

import { SocketIoService } from "./service/socket-io.service";
import { StatusComponent } from "./component/status/status.component";
import { NewNetworkerComponent } from "./component/new-networker/new-networker.component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HostNumberComponent,
    NetworkersComponent,
    StatusComponent,
    NewNetworkerComponent,
  ],
  providers: [
    SocketIoService,
  ],
  exports: [
    HostNumberComponent,
    NetworkersComponent,
  ],
})
export class NetworkingModule {
}
