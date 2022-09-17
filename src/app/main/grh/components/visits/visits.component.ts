import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import { Visit } from "../../models/visit.model";
import { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../services/employee.service";
import { VisitService } from "../../services/visit.service";
import { HolidayBalance } from "../../models/holiday-balance.model";

@Component({
  selector: "app-visits",
  templateUrl: "./visits.component.html",
  styleUrls: ["./visits.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VisitsComponent implements OnInit {
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

  visits?: Visit[];
  visit: Visit = {
    id: null,
    datetime: null,
    name: "",
    cin: "",
    visitPurpose: "",
    observation: "",
    employee_id: null,
  };

  // holidaybalance: HolidayBalance = {
  //   id: 0,
  //   balance: 0,
  //   timestamp: null,
  // };

  employees?: Employee[];
  // employeeS: Employee = {
  //   id: 0,
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phoneNumber: "",
  //   holidaybalance_id: 0,
  //   holidaybalance: this.holidaybalance,
  //   warnings: [],
  //   requestHolidays: [],
  //   requestAbsences: [],
  //   requestDepartures: [],
  //   requestMaterials: [],
  //   requestRecuperationHolidays: [],
  //   visits: [],
  // };

  idEmployee: any = "";

  constructor(
    private modalService: NgbModal,
    private visitService: VisitService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllvisits();
    this.getEmployees();

    this.contentHeader = {
      headerTitle: "Visit",
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
            name: "All visits",
            isLink: false,
          },
        ],
      },
    };
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      cin: [
        "",
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      visitPurpose: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(150),
        ],
      ],
      observation: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
    });
  }

  public form: FormGroup = new FormGroup({
    name: new FormControl(""),
    cin: new FormControl(""),
    visitPurpose: new FormControl(""),
    observation: new FormControl(""),
  });
  submitted = false;

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // ------------ pagination & search ------------

  page = 1;
  count = 0;
  search = "";
  public pagePosition = 1;
  public totalPages = 0;
  public chkBoxSelected = [];

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllvisits();
  }

  getParams(page: number, pageSize: number, search: string) {
    let params: any = {};
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (search) {
      params["search"] = search;
    }
    return params;
  }

  public getAllvisits(): void {
    const params = {
      page: this.page - 1,
      size: 8,
      search: this.search,
    };
    console.log(params);
    this.visitService.getVisits(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        console.log(content);

        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.visits = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------ Add visit ------------

  AddVisit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.visit.name = this.form.value.name;
    this.visit.cin = this.form.value.cin;
    this.visit.visitPurpose = this.form.value.visitPurpose;
    this.visit.observation = this.form.value.observation;
    this.visit.employee_id = this.idEmployee;

    console.log(this.visit);
    this.createVisit(this.visit);
  }

  createVisit(visit: Visit): void {
    this.visitService.createVisit(visit).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Visit has been saved with success",
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

  onChange(e: any) {
    this.idEmployee = e.target.value;
  }

  // ------------ Delete Visit ------------

  private modal = null;
  private idVisit = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.idVisit = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  deleteVisit(id: number) {
    this.modal.close("Accept click");
    this.visitService.deleteVisit(this.idVisit).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ------------ Update visit ------------

  modalEdit(modalPrimaryedit, id) {
    this.visitService.getVisit(id).subscribe({
      next: (data) => {
        this.visit = data;
        this.visit.employee_id = this.idEmployee;
        this.form = this.formBuilder.group({
          name: [
            this.visit.name,
            [Validators.required, Validators.minLength(3)],
          ],
          cin: [
            this.visit.cin,
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(8),
            ],
          ],
          visitPurpose: [
            this.visit.visitPurpose,
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(150),
            ],
          ],
          observation: [
            this.visit.observation,
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(150),
            ],
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

  updateVisit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.visit.name = this.form.value.name;
    this.visit.cin = this.form.value.cin;
    this.visit.visitPurpose = this.form.value.visitPurpose;
    this.visit.observation = this.form.value.observation;
    this.visit.employee_id = this.idEmployee;
    this.editVisit(this.visit);
  }

  editVisit(visit: Visit): void {
    this.visitService.updateVisit(visit.id, visit).subscribe({
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
    const params = { page: this.page - 1, size: 8, name: this.search };
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
}
