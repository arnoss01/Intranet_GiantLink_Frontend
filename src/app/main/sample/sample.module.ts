import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SampleComponent } from './sample.component';
import { HomeComponent } from './home.component';
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";

const routes = [
  {
    path: 'sample',
    component: SampleComponent,
    data: { animation: 'sample' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [SampleComponent, HomeComponent],
    imports: [
        RouterModule.forChild(routes),
        ContentHeaderModule,
        TranslateModule,
        CoreCommonModule,
        NgbCollapseModule
    ],
  exports: [SampleComponent, HomeComponent]
})
export class SampleModule {}
