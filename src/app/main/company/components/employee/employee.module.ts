import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AllEmployeesComponent } from './all-employees/all-employees.component';

const routes: Routes = 
[
    {
        path: 'addemployee',
        component: AddEmployeeComponent,
      },
      {
        path: 'allemployees',
        component: AllEmployeesComponent,
      },
      
];

@NgModule({
  declarations: [
    AddEmployeeComponent,
    AllEmployeesComponent
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
    SweetAlert2Module.forRoot()
  ],

  providers: []
})
export class EmployeeModule { }