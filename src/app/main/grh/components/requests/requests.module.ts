import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AllHolidayRequestsComponent } from "./all-holiday-requests/all-holiday-requests.component";
import { AllAbsenceRequestsComponent } from "./all-absence-requests/all-absence-requests.component";
import { AllDepartureRequestsComponent } from "./all-departure-requests/all-departure-requests.component";
import { AllMaterialRequestsComponent } from "./all-material-requests/all-material-requests.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "all-holiday-requests",
    component: AllHolidayRequestsComponent,
  },
  {
    path: "all-absence-requests",
    component: AllAbsenceRequestsComponent,
  },
  {
    path: "all-departure-requests",
    component: AllDepartureRequestsComponent,
  },
  {
    path: "all-material-requests",
    component: AllMaterialRequestsComponent,
  },
];

@NgModule({
  declarations: [
    AllHolidayRequestsComponent,
    AllAbsenceRequestsComponent,
    AllDepartureRequestsComponent,
    AllMaterialRequestsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RequestsModule {}
