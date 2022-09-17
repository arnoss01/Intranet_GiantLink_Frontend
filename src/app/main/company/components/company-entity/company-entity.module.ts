import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddCompanyentityComponent } from './add-companyentity/add-companyentity.component';


const routes: Routes = 
[
  {
    path: 'addcompanyentity',
    component: AddCompanyentityComponent,
  },
  {
    path: 'allentities', 
    loadChildren: () => import('./all-entities/all-entities.module').then(m => m.AllEntitiesModule)
  },
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
export class CompanyEntityModule { }