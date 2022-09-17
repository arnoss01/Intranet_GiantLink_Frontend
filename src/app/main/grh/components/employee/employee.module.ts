import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { RouterModule, Routes } from "@angular/router";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CardSnippetModule} from "../../../../../@core/components/card-snippet/card-snippet.module";
import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";
import {FormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreDirectivesModule} from "../../../../../@core/directives/directives";

const routes: Routes = [
  {
    path: "all-employees",
    component: AllEmployeesComponent,
  },
  {
    path: "employee-details/:id",
    component: EmployeeDetailsComponent,
  },
];

@NgModule({
  declarations: [AllEmployeesComponent, EmployeeDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxDatatableModule, CardSnippetModule, ContentHeaderModule, FormsModule, NgbPaginationModule, CoreDirectivesModule],
})
export class EmployeeModule {}
