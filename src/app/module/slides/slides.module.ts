import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SlideComponent } from "./component/slide/slide.component";
import { SlidesComponent } from "./component/slides/slides.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    SlideComponent,
    SlidesComponent,
  ],
  exports: [
    SlidesComponent,
  ],
})
export class SlidesModule {
}
