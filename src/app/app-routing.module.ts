import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

const appRoute: Routes = [
  {
    path: "admin", component: AdminLayoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
