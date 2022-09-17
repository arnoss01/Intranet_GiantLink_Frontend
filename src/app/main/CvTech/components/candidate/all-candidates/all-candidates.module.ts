import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AllCandidatesComponent } from './all-candidates.component';
import { CandidateDetailsComponent } from './candidate-details/candidate-details.component';


const routes: Routes = [
  {
    path: 'allcandidates',
    component: AllCandidatesComponent,
  },
  {
    path: 'candidat-details/:candidat_id',
    component: CandidateDetailsComponent
  }
];

@NgModule({
  declarations: [
    CandidateDetailsComponent,
    AllCandidatesComponent
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
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ]
})
export class AllCandidatesModule { }
