import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Campaign } from "app/main/CvTech/models/campaign.model";
import { Function } from "app/main/CvTech/models/function.model";
import { CampaignService } from "app/main/CvTech/services/campaign.service";
import { FunctionService } from "app/main/CvTech/services/function.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-function",
  templateUrl: "./function.component.html",
  styleUrls: ["./function.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class FunctionComponent implements OnInit {

  public data?: Function[];
  public functionAdd: Function = { id: 0, name: "", description: "", campaignId: 11 };

  public totalPages = 0;
  public page = 1;
  public basicSelectedOption = 5;
  
  public name = "";
  public submitted = false;
  public ColumnMode = ColumnMode;
  private modal = null;
  private id = 0;
  public contentHeader: Object;
  public campaigns: Campaign[];

  public funcForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    campaignId: new FormControl(""),
  });

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private functionService: FunctionService
    , private campaignService: CampaignService , private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getAllFunctions();
    this.getAllCampaign();
    this.contentHeader = {
      headerTitle: "Function",
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
            name: "Function",
            isLink: false,
          },
        ],
      },
    };
  }


  public pageChanged(event: any): void {
    this.page = event;
    this.getAllFunctions();
  }

  getAllFunctions(): void {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };

    this.functionService.getAllPagination(params).subscribe({
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

  getAllCampaign(): void {
    this.campaignService.getAllCampaign().subscribe({
      next: (value: any) => {
        this.campaigns = value;
        console.log(this.campaigns);
      },
    })
  }

  modalOpen(modalBasic) {

    this.funcForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
      campaignId: [
        '',
        [
          Validators.required,
        ],
      ],
    });
    this.modalService.open(modalBasic, {
      centered: true,
      windowClass: "modal modal-primary",
      size: "lg",
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
    return this.funcForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.funcForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")

      return;
    }
    this.functionAdd = this.funcForm.value;

    this.addFunction();
  }

  public addFunction(): void {
    console.log(this.functionAdd);
    const functionData = {
      name: this.functionAdd.name,
      description: this.functionAdd.description,
      campaignId: this.functionAdd.campaignId
    };
    this.functionService.addFunction(functionData).subscribe({
      next: (data) => {
        this.modalService.dismissAll();
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastrSuccess(" Function added successfully !! ");


      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
    this.emptyfields();
  }

  // ------------ Edit function ------------

  modalEdit(modalPrimaryedit, id) {
    this.functionService.getFunction(id).subscribe({
      next: (data) => {
        this.functionAdd = data;
        this.funcForm = this.formBuilder.group({
          name: [
            this.functionAdd.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ],
          description: [
            this.functionAdd.description,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(45),
            ],
          ],
          campaignId: [
            this.functionAdd.campaignId,
            [
              Validators.required,
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
      size: 'lg',
    });
  }

  edit(): void {
    if (this.funcForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")

      return;
    }
    this.functionAdd.name = this.funcForm.value.name;
    this.functionAdd.description = this.funcForm.value.description;
    this.functionAdd.campaignId = this.funcForm.value.campaignId;

    this.updateFunction(this.functionAdd);
  }

  updateFunction(funct: Function): void {
    this.functionService.updateFunction(funct.id, funct).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllFunctions();
        this.modalService.dismissAll();
        this.toastrSuccess(" Function updated successfully !! ");

      },
      error: (err) => {
        console.error(err);
      },
    });
    this.emptyfields();
  }

  emptyfields() {
    this.funcForm = this.formBuilder.group({
      name: [
        '',
      ],
      description: [
        '',
      ],
      campaignId: [
        '',
      ],
    });
  }

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

  // ------------- delete -------------- //

  public deleteData() {
    console.log(this.id);

    this.modal.close("Accept click");
    this.functionService.deleteFunction(this.id).subscribe({
      next: () => {
        console.log("Function deleted !", this.id);
        this.ngOnInit();
        this.toastrSuccess(" Function deleted successfully !! ");

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.funcForm.reset();
  }
}
