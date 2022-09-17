import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CoreCommonModule } from "@core/common.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";
import {VisitsComponent} from "../../grh/components/visits/visits.component";
import {WarningTypeComponent} from "../../grh/components/warning-type/warning-type.component";
import {WarningComponent} from "../../grh/components/warning/warning.component";
import {ForumsComponent} from "./forums/forums.component";
import {ConfigurationComponent} from "./configuration/configuration.component";
import {DocumentsComponent} from "./documents/documents.component";


const routes: Routes = [
    {
        path: "forums",
        component: ForumsComponent,
    },
    {
        path: "documents",
        component: DocumentsComponent,
    },
    {
        path: "configuration",
        component: ConfigurationComponent,
    },
];

@NgModule({
    declarations: [
        ForumsComponent,
        ConfigurationComponent,
        DocumentsComponent,


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
        SweetAlert2Module.forRoot(),
    ],

    providers: [],
})
export class ComponentsModule {}