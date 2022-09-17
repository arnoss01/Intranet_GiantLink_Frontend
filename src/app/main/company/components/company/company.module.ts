import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddCompanyComponent } from './add-company/add-company.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes: Routes = 
[
  {
    path: 'addcompany',
    component: AddCompanyComponent,
  },
  {
    path: 'allcompanies', 
    loadChildren: () => import('./all-companies/all-companies.module').then(m => m.AllCompaniesModule)
  },
];

@NgModule({
  declarations: [
    AddCompanyComponent
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
export class CompanyModule { }