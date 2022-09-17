import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddCourseComponent } from './add-course/add-course.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


const routes: Routes =
  [
    {
      path: 'addcourse',
      component: AddCourseComponent,
    },
    {
      path: 'allcourses',
      loadChildren: () => import('./all-courses/all-courses.module').then(m => m.AllCoursesModule)
    },
  ];

@NgModule({
  declarations: [
    AddCourseComponent
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
export class CourseModule { }