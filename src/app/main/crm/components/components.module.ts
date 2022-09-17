import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { ProjectsComponent } from './projects/projects.component';
import { CommercialComponent } from './commercial/commercial.component';

const routes: Routes = [
  {
    path: "project",
    component: ProjectsComponent
    // path: 'project',
    //loadChildren: () => import('./projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'commercial',
    //loadChildren: () => import('./commercial/commercial.module').then(m => m.CommercialModule)
    component: CommercialComponent
  }

]

@NgModule({
  declarations: [
    ProjectsComponent,
    CommercialComponent
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
  ]
})

export class ComponentsModule { }
