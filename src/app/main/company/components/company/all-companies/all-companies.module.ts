import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AllCompaniesComponent } from "./all-companies.component";
import { CompanyDetailsComponent } from "./company-details/company-details.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { CoreCardModule } from "@core/components/core-card/core-card.module";

const routes: Routes = [
  {
    path: "",
    component: AllCompaniesComponent,
  },
  {
    path: "company-details/:company_id",
    component: CompanyDetailsComponent,
  },
];

@NgModule({
  declarations: [CompanyDetailsComponent, AllCompaniesComponent],
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
  ],

  providers: [],
})
export class AllCompaniesModule {}
