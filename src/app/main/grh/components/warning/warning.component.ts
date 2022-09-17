import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RhWarning } from "../../models/rh-warning.model";
import { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";
import { WarningService } from "../../services/warning.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { RhWarningType } from "../../models/rh-warning-type.model";
import { WarningTypeService } from "../../services/warning-type.service";

@Component({
  selector: "app-warning",
  templateUrl: "./warning.component.html",
  styleUrls: ["./warning.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class WarningComponent implements OnInit {
  contentHeader: {
    headerTitle: string;
    actionButton: boolean;
    breadcrumb: {
      type: string;
      links: (
        | { name: string; isLink: boolean; link: string }
        | { name: string; isLink: boolean; link?: undefined }
      )[];
    };
  };

  warningTypeS: RhWarningType = {
    id: null,
    title: "",
    datetime: null,
    description: "",
    warnings: [],
  };

  warnings?: RhWarning[];
  warning: RhWarning = {
    id: null,
    employee_id: null,
    rhWarningType_id: null,
    warningType: this.warningTypeS,
    messageDetail: "",
    datetime: null,
  };

  employees?: Employee[];
  // employeeS: Employee = {
  //   id: 0,
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   holidaybalance_id: 0,
  //   warnings: [],
  //   requestHolidays: [],
  //   requestAbsences: [],
  //   requestDepartures: [],
  //   requestMaterials: [],
  //   requestRecuperationHolidays: [],
  //   visits: [],
  // };

  idEmployee: any = "";

  warningTypes?: RhWarningType[];
  // warningTypeS: RhWarningType = {
  //   id: null,
  //   title: "",
  //   datetime: null,
  //   description: "",
  //   warnings: [],
  // };

  idWarningType: any = "";

  constructor(
    private modalService: NgbModal,
    private warningService: WarningService,
    private warningTypeService: WarningTypeService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllWarnings();
    this.getAllWarningTypes();
    this.getEmployees();

    this.contentHeader = {
      headerTitle: "Warning",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "All warnings",
            isLink: false,
          },
        ],
      },
    };
    this.form = this.formBuilder.group({
      messageDetail: ["", [Validators.required, Validators.minLength(5)]],
    });
  }

  public form: FormGroup = new FormGroup({
    messageDetail: new FormControl(""),
  });
  submitted = false;

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // ------------ pagination & search ------------

  page = 1;
  count = 0;
  firstName = "";
  name = "";
  public pagePosition = 1;
  public totalPages = 0;
  public chkBoxSelected = [];

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllWarnings();
  }

  getParams(page: number, pageSize: number, firstName: string) {
    let params: any = {};
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (firstName) {
      params["firstName"] = firstName;
    }
    return params;
  }

  public getAllWarnings(): void {
    const params = {
      page: this.page - 1,
      size: 8,
      firstName: this.firstName,
    };
    console.log(params);
    this.warningService.getRhWarnings(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        console.log(content);

        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.warnings = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------ Add warning ------------

  AddWarning(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.warning.employee_id = this.idEmployee;
    this.warning.rhWarningType_id = this.idWarningType;
    this.warning.messageDetail = this.form.value.messageDetail;

    console.log(this.warning);
    this.createWarning(this.warning);
  }

  createWarning(warning: RhWarning): void {
    this.warningService.createRhWarning(warning).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Warning has been saved with success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.modalService.dismissAll("Cross click");
        this.ngOnInit();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  modalAdd(modalPrimaryAdd) {
    this.modalService.open(modalPrimaryAdd, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  onChangeEmployee(e: any) {
    this.idEmployee = e.target.value;
  }

  onChangeWarningType(e: any) {
    this.idWarningType = e.target.value;
  }

  // ------------ Delete RhWarning ------------

  private modal = null;
  private idWarning = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.idWarning = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  deleteWarning(id: number) {
    this.modal.close("Accept click");
    this.warningService.deleteRhWarning(this.idWarning).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ------------ Update warning ------------

  // edit: RhWarning = {
  //   id: null,
  //   employee_id: null,
  //   rhWarningType_id: null,
  //   messageDetail: "",
  //   datetime: null,
  // };

  modalEdit(modalPrimaryedit, id) {
    this.warningService.getRhWarning(id).subscribe({
      next: (data) => {
        this.warning = data;
        this.warning.employee_id = this.idEmployee;
        this.warning.rhWarningType_id = this.idWarningType;
        this.form = this.formBuilder.group({
          messageDetail: [
            this.warning.messageDetail,
            [Validators.required, Validators.minLength(5)],
          ],
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  updateWarning(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.warning.messageDetail = this.form.value.messageDetail;
    this.warning.employee_id = this.idEmployee;
    this.warning.rhWarningType_id = this.idWarningType;
    this.editWarning(this.warning);
  }

  editWarning(warning: RhWarning): void {
    this.warningService.updateRhWarning(warning.id, warning).subscribe({
      next: (data) => {
        this.modalService.dismissAll("Cross click");
        this.ngOnInit();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------ GET employees for select ------------

  getEmployees(): void {
    const params = { page: this.page - 1, size: 8, name: this.firstName };
    this.employeeService.getEmployees(params).subscribe({
      next: (data) => {
        const { content, totalElements } = data;
        this.employees = content;
        this.count = totalElements;
        this.idEmployee = this.employees[0].id;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getAllWarningTypes(): void {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.warningTypeService.getRhWarningTypes(params).subscribe({
      next: (data) => {
        const { content, totalElements } = data;
        this.warningTypes = content;
        this.count = totalElements;
        this.idWarningType = this.warningTypes[0].id;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
