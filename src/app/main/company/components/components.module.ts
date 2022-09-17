import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const routes: Routes = 
[
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'company-entity',
    loadChildren: () => import('./company-entity/company-entity.module').then(m => m.CompanyEntityModule)
  },
  {
    path: 'department',
    loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'job',
    loadChildren: () => import('./job/job.module').then(m => m.JobModule)
  }

];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule
  ],

  providers: []
})
export class ComponentsModule { }
