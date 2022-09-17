import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {CoreCommonModule} from "../../../@core/common.module";
import {ContentHeaderModule} from "../../layout/components/content-header/content-header.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ComponentsModule} from "../grh/components/components.module";




const routes: Routes = [
    {
        path: '',
        loadChildren: () =>       import("./components/components.module").then((m) => m.ComponentsModule),

    },
]

@NgModule({
    declarations: [

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
        ComponentsModule,
    ],
    providers: [],

})
export class WorkspaceModule { }