import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { CoreCardModule } from "@core/components/core-card/core-card.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import { AllTeamsComponent } from "./all-teams.component";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
    {
      path: '',
      component: AllTeamsComponent,
    }
  ];
  
  @NgModule({
    declarations: [
      AllTeamsComponent,
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
  export class AllTeamsModule { }