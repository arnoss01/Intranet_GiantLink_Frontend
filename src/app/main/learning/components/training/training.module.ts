import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CoreCommonModule} from "../../../../../@core/common.module";
import {ContentHeaderModule} from "../../../../layout/components/content-header/content-header.module";
import {AddCompanyComponent} from "../../../company/components/company/add-company/add-company.component";
import {TrainingComponent} from "./training.component";
import {AddTrainingComponent} from "./add-training/add-training.component";
import Swal from "sweetalert2";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";



const routes: Routes =
    [
        {
            path: '',
            component: TrainingComponent
        },
        {
            path: 'addtraining',
            component: AddTrainingComponent,
        },

    ];

@NgModule({
    declarations: [
            TrainingComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        ContentHeaderModule,
        NgbModule,
        NgSelectModule,
        FormsModule,
        SweetAlert2Module.forRoot(),
        NgxDatatableModule

    ],

    providers: []
})
export class ComponentsModule { }
