import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CompanyEntity } from "../../../models/company-entity.model";
import { Company } from "../../../models/company.model";
import { CompanyEntityService } from "../../../services/company-entity.service";
import { CompanyService } from "../../../services/company.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-all-entities",
  templateUrl: "./all-entities.component.html",
  styleUrls: ["./all-entities.component.scss"],
})
export class AllEntitiesComponent implements OnInit {
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

  entities?: CompanyEntity[];
  entity: CompanyEntity = {
    id: null,
    name: "",
    timestamp: "",
    departements: [],
    company_id: null,
  };

  companies?: Company[];
  idcompany: any;

  constructor(
    private modalService: NgbModal,
    private entityService: CompanyEntityService,
    private companyservice: CompanyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllentities();
    this.getCompanies();

    this.contentHeader = {
      headerTitle: "Company",
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
            name: "Companies",
            isLink: true,
            link: "/",
          },
          {
            name: "Company entity",
            isLink: true,
            link: "/",
          },
          {
            name: "All entities",
            isLink: false,
          },
        ],
      },
    };
    this.form = this.formBuilder.group({
      entityname: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  public form: FormGroup = new FormGroup({
    entityname: new FormControl(""),
  });
  submitted = false;

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // ------------ pagination & search ------------

  page = 1;
  count = 0;
  name = "";
  public pagePosition = 1;
  public totalPages = 0;
  public chkBoxSelected = [];

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllentities();
  }

  getParams(page: number, pageSize: number, name: string) {
    let params: any = {};
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (name) {
      params["name"] = name;
    }
    return params;
  }

  public getAllentities(): void {
    const params = {
      page: this.page - 1,
      size: 8,
      name: this.name,
    };
    this.entityService.getCompanyentities(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        console.log(content);

        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.entities = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------ Add Entity ------------

  AddEntity(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.entity.name = this.form.value.entityname;
    this.entity.company_id = this.idcompany;
    this.createEntity(this.entity);
  }

  modalAdd(modalPrimaryAdd) {
    this.modalService.open(modalPrimaryAdd, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  createEntity(entity: CompanyEntity): void {
    this.entityService.createCompanyEntity(entity).subscribe({
      next: (data) => {
        Swal.fire({
          icon: "success",
          title: "Entity has been saved with success",
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

  onChange(e: any) {
    this.idcompany = e.target.value;
  }

  // ------------ Delete Entity ------------

  private modal = null;
  private identity = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.identity = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  deleteEntity(id: number) {
    this.modal.close("Accept click");
    this.entityService.deleteCompanyEntity(this.identity).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ------------ Update entity ------------

  edit: CompanyEntity = {
    id: null,
    name: "",
    timestamp: "",
    departements: [],
    company_id: null,
  };

  modalEdit(modalPrimaryedit, id) {
    this.entityService.getCompanyEntity(id).subscribe({
      next: (data) => {
        this.entity = data;
        this.entity.company_id = this.idcompany;
        this.form = this.formBuilder.group({
          entityname: [
            this.entity.name,
            [Validators.required, Validators.minLength(3)],
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

  updateEntity(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.entity.name = this.form.value.entityname;
    this.entity.company_id = this.idcompany;
    this.editEntity(this.entity);
  }

  editEntity(entity: CompanyEntity): void {
    this.entityService.updateCompanyEntity(entity.id, entity).subscribe({
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

  // ------------ GET companies for select ------------

  getCompanies(): void {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.companyservice.getCompanies(params).subscribe({
      next: (data) => {
        const { content, totalElements } = data;
        this.companies = content;
        this.count = totalElements;
        this.idcompany = this.companies[0].id;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
