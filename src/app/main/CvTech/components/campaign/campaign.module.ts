import { RegionComponent } from './Region/region.component';
import { ContractComponent } from './contract/contract.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { FunctionComponent } from './function/function.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./component/component.module').then(m => m.ComponentModule)
  },
  {
    path: 'function',
    component: FunctionComponent
  },
  {
    path:'contract',
    component:ContractComponent
  },
  {
    path:'region',
    component:RegionComponent
  }

];

@NgModule({
  declarations: [
    FunctionComponent,
    ContractComponent,
    RegionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
    CardSnippetModule,
    SweetAlert2Module.forRoot(),
  ],

  providers: []
})
export class CampaignModule { }
