import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbDateParserFormatter, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { RequestHoliday } from "app/main/grh/models/request-holiday.model";
import { RequestHolidayService } from "app/main/grh/services/request-holiday.service";

@Component({
  selector: "app-all-vacation",
  templateUrl: "./all-vacation.component.html",
  styleUrls: ["./all-vacation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllVacationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }


}
