import { RegionService } from './../../../services/region.service';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";

import { Region } from "app/main/CvTech/models/region.model";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-region",
  templateUrl: "./region.component.html",
  styleUrls: ["./region.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RegionComponent implements OnInit {

  public data?: Region[];
  public regionadd: Region = { id: 0, name: "" };

  public totalPages = 0;
  public page = 1;
  public basicSelectedOption = 5;
  public name = "";
  public submitted = false;
  public ColumnMode = ColumnMode;
  private modal = null;
  private id = 0;
  public contentHeader: Object;

  public regionForm: FormGroup = new FormGroup({
    name: new FormControl(""),
  
  });

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private regionService: RegionService ,private toastr: ToastrService ) { }


  ngOnInit(): void {
    this.getAllRegion();
    this.contentHeader = {
      headerTitle: "Region",
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
            name: "CvTech",
            isLink: true,
            link: "/",
          },
          {
            name: "Profil",
            isLink: true,
            link: "/",
          },
          {
            name: "Region",
            isLink: false,
          },
        ],
      },
    };
    this.regionForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
    });
  }

  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllRegion();
  }

  getAllRegion(): void {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };

    this.regionService.getAllPagination(params).subscribe({
      next: (response: any) => {
        const { content, totalPages } = response;
        this.totalPages = totalPages * 10;
        this.data = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  modalOpenDanger(modalDanger, id: any) {
    this.id = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.regionForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.regionForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")

      return;
    }
    this.regionadd = this.regionForm.value;

    this.addRegion();
  }

  public addRegion(): void {
    console.log(this.regionadd);
    const regionData = {
      name: this.regionadd.name,
    };
    this.regionService.addRegion(regionData).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.toastrSuccess(" Region added successfully !! ");

        this.modalService.dismissAll();
        

      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
  }


  // ------------ Edit region ------------

  modalEdit(modalPrimaryedit, id) {
    this.regionService.getRegion(id).subscribe({
      next: (data) => {
        this.regionadd = data;
        this.regionForm = this.formBuilder.group({
          name: [
            this.regionadd.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ]
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


  modalAdd(modalPrimaryadd) {
    this.regionadd.name = "";
    
    this.regionForm = this.formBuilder.group({
      name: [
        this.regionadd.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ]
    });

    this.modalService.open(modalPrimaryadd, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

   // Success
   toastrSuccess(message: string) {
    this.toastr.success('👋 ' + message, 'Success!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  // Warning
  toastrWarning(message: string) {
    this.toastr.warning('👋 ' + message, 'Warning!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  edit(): void {
    if (this.regionForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")

      return;
    }
    this.regionadd.name = this.regionForm.value.name;


    this.updateRegion(this.regionadd);
  }

  updateRegion(region: Region): void {
    console.log(region);
    this.regionService.updateRegion(region.id, region).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllRegion();
        this.modalService.dismissAll();
        this.toastrSuccess(" Region added successfully !! ");
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  

  // ------------- delete -------------- //

  public deleteData() {
    console.log(this.id);

    this.modal.close("Accept click");
    this.regionService.deleteRegion(this.id).subscribe({
      next: () => {
        console.log("Region deleted !", this.id);
        this.ngOnInit();
        this.toastrSuccess(" Region deleted successfully !! ");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.regionForm.reset();
  }
}
