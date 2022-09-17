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
import { RhWarningType } from "../../models/rh-warning-type.model";
import { WarningTypeService } from "../../services/warning-type.service";

@Component({
  selector: "app-warning-type",
  templateUrl: "./warning-type.component.html",
  styleUrls: ["./warning-type.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class WarningTypeComponent implements OnInit {
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

  warningTypes?: RhWarningType[];
  warningType: RhWarningType = {
    id: null,
    title: "",
    datetime: null,
    description: "",
    warnings: [],
  };

  constructor(
    private modalService: NgbModal,
    private warningTypeService: WarningTypeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllWarningTypes();

    this.contentHeader = {
      headerTitle: "RhWarningType",
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
            name: "All warningTypes",
            isLink: false,
          },
        ],
      },
    };
    this.form = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
    });
  }

  public form: FormGroup = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
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
    this.getAllWarningTypes();
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

  public getAllWarningTypes(): void {
    const params = {
      page: this.page - 1,
      size: 8,
      name: this.name,
    };
    console.log(params);
    this.warningTypeService.getRhWarningTypes(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        console.log(content);

        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.warningTypes = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------ Add warning type ------------

  AddWarningType(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.warningType.title = this.form.value.title;
    this.warningType.description = this.form.value.description;

    console.log(this.warningType);
    this.createRhWarningType(this.warningType);
  }

  createRhWarningType(warningType: RhWarningType): void {
    this.warningTypeService.createRhWarningType(warningType).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "RhWarningType has been saved with success",
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

  // onChange(e: any) {
  //   this.idEmployee = e.target.value;
  // }

  // ------------ Delete RhWarningType ------------

  private modal = null;
  private idWarningType = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.idWarningType = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  deleteWarningType(id: number) {
    this.modal.close("Accept click");
    this.warningTypeService.deleteRhWarningType(this.idWarningType).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ------------ Update warningType ------------

  edit: RhWarningType = {
    id: null,
    title: "",
    datetime: null,
    description: "",
    warnings: [],
  };

  modalEdit(modalPrimaryedit, id) {
    this.warningTypeService.getRhWarningType(id).subscribe({
      next: (data) => {
        this.warningType = data;
        this.form = this.formBuilder.group({
          title: [
            this.warningType.title,
            [Validators.required, Validators.minLength(3)],
          ],
          description: [this.warningType.description],
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

  updateWarningType(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.warningType.title = this.form.value.title;
    this.warningType.description = this.form.value.description;
    this.editRhWarningType(this.warningType);
  }

  editRhWarningType(warningType: RhWarningType): void {
    this.warningTypeService
      .updateRhWarningType(warningType.id, warningType)
      .subscribe({
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
}
