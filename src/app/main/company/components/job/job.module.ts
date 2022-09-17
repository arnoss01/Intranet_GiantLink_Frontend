import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AllJobsComponent } from './all-jobs/all-jobs.component';

const routes: Routes = 
[
    {
        path: 'alljobs',
        component: AllJobsComponent,
      }
];

@NgModule({
  declarations: [
    AllJobsComponent
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
      CoreCardModule,
      SweetAlert2Module.forRoot(),
      TranslateModule
  ],

  providers: []
})
export class JobModule { }