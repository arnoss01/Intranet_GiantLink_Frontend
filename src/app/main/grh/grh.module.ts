import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { ComponentsModule } from "./components/components.module";
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./components/components.module").then((m) => m.ComponentsModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
    ComponentsModule,
  ],

  providers: [],
})
export class GrhModule {

}
