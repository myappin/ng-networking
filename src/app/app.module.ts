import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";

import { NotFoundComponent } from "./component/not-found/not-found.component";

import { routes } from "./app.routes";

import { NetworkingModule } from "./module/networking/networking.module";

import { SlidesModule } from "./module/slides/slides.module";

import { APP_BASE_HREF } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),

    NetworkingModule,
    SlidesModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: "/"}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
