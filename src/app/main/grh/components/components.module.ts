import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { AddEmployeeVacationComponent } from "./vacation/add-employee-vacation/add-employee-vacation.component";
import { AllVacationComponent } from "./vacation/all-vacation/all-vacation.component";
import { VisitsComponent } from "./visits/visits.component";
import { WarningTypeComponent } from "./warning-type/warning-type.component";
import { WarningComponent } from "./warning/warning.component";

const routes: Routes = [
  {
    path: "visit",
    component: VisitsComponent,
  },
  {
    path: "warningType",
    component: WarningTypeComponent,
  },
  {
    path: "warning",
    component: WarningComponent,
  },
  {
    path: "requests",
    loadChildren: () =>
      import("./requests/requests.module").then((m) => m.RequestsModule),
  },
  {
    path: "employee",
    loadChildren: () =>
      import("./employee/employee.module").then((m) => m.EmployeeModule),
  },
];

@NgModule({
  declarations: [
    AddEmployeeVacationComponent,
    AllVacationComponent,
    VisitsComponent,
    WarningTypeComponent,
    WarningComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
    SweetAlert2Module.forRoot(),
  ],

  providers: [],
})
export class ComponentsModule {}
