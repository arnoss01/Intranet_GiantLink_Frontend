import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoreCommonModule } from "../../../../@core/common.module";
import { ContentHeaderModule } from "../../../layout/components/content-header/content-header.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AddTrainingComponent } from './training/add-training/add-training.component';

const routes: Routes =
    [
        {
            path: 'training',
            loadChildren: () => import('./training/training.module').then(m => m.ComponentsModule)
        },
        {
            path: 'course',
            loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
        },

    ];

@NgModule({
    declarations: [


        AddTrainingComponent
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
    ],

    providers: []
})
export class ComponentsModule { }
