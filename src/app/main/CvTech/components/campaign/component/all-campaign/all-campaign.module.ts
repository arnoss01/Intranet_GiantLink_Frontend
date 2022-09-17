import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { AllCampaignComponent } from './all-campaign.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';

const routes: Routes = [
  {
    path: '',
    component: AllCampaignComponent,
  },
  {
    path: 'campaign-details/:campaign_id',
    component: CampaignDetailsComponent
  }
];

@NgModule({
  declarations: [
    CampaignDetailsComponent,
    AllCampaignComponent
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
    CoreCardModule
  ]
})
export class AllCampaignModule { }
