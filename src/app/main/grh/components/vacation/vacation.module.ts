import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeVacationComponent } from './add-employee-vacation/add-employee-vacation.component';
import { AllVacationComponent } from './all-vacation/all-vacation.component';

const routes: Routes =
  [
    {
      path: 'add-vacation',
      component: AddEmployeeVacationComponent,
    },
    {
      path: 'all-vacation',
      component: AllVacationComponent,
    }
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class VacationModule { }
