import { Routes } from "@angular/router";

import { NotFoundComponent } from "./component/not-found/not-found.component";

import { SlidesComponent } from "./module/slides/component/slides/slides.component";

export const routes: Routes = [
  {
    path: "slides/:num",
    component: SlidesComponent,
  },
  {
    path: "slides",
    component: SlidesComponent,
  },
  {
    path: "",
    redirectTo: "/slides",
    pathMatch: "full",
  },
  {path: "**", component: NotFoundComponent},
];
