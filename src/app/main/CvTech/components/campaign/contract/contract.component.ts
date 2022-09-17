import { ContratService } from 'app/main/CvTech/services/contrat.service';
import { Contrat } from './../../../models/contrat.model';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Campaign } from "app/main/CvTech/models/campaign.model";
import { CampaignService } from "app/main/CvTech/services/campaign.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class ContractComponent implements OnInit {

  public data?: Contrat[];
  public contractAdd: Contrat = { id: 0, name: "", description: "", campaignId : 11 };

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

  public contForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    campaignId: new FormControl(""),
  });

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private contratService: ContratService
    , private campaignService: CampaignService , private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getAllContracts();
    this.getAllCampaign();
    this.contentHeader = {
      headerTitle: "Contract",
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
            name: "contract",
            isLink: false,
          },
        ],
      },
    };
    this.contForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ], campaignId: [
        "", [
          Validators.required,
        ],
      ]
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
    this.getAllContracts();
  }

  getAllContracts(): void {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };

    this.contratService.getAllPagination(params).subscribe({
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

  modalOpenDanger(modalDanger, id: any) {
    this.id = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.contForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong . ");

      return;
    }
    this.contractAdd = this.contForm.value;

    this.addContracts();
  }

  public addContracts(): void {
    console.log(this.contractAdd);
    const contractData = {
      name: this.contractAdd.name,
      description: this.contractAdd.description,
      campaignId: this.contractAdd.campaignId
    };
    this.contratService.createContrat(contractData).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastrSuccess("Contract added successfully !! ");
      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
  }

  // ------------ Edit Contract ------------

  modalEdit(modalPrimaryedit, id) {
    this.contratService.getContrat(id).subscribe({
      next: (data) => {
        this.contractAdd = data;
        this.contForm = this.formBuilder.group({
          name: [
            this.contractAdd.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ],
          description: [
            this.contractAdd.description,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(45),
            ],
          ],
          campaignId: [
            this.contractAdd.campaignId,
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
    });
  }



  modalAdd(modalPrimaryadd) {
    this.contractAdd.name = "";
    this.contractAdd.description = "";
    this.contractAdd.campaignId = 0;
    this.contForm = this.formBuilder.group({
      name: [
        this.contractAdd.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z ]*"),
        ],
      ],
      description: [
        this.contractAdd.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(45),
        ],
      ],
      campaignId: [
        this.contractAdd.campaignId,
        [
          Validators.required,
        ],
      ],
    });

    this.modalService.open(modalPrimaryadd, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  toastrSuccess(message: string) {
    this.toastr.success('👋 ' + message, 'Success!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  toastrWarning(message: string) {
    this.toastr.warning('👋 ' + message, 'Warning!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  edit(): void {
    if (this.contForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")
      return;
    }
    this.contractAdd.name = this.contForm.value.name;
    this.contractAdd.description = this.contForm.value.description;
    this.contractAdd.campaignId = this.contForm.value.campaignId;

    this.updateContracts(this.contractAdd);
  }

  updateContracts(cont: Contrat): void {
    console.log(cont);
    this.contratService.updateContract(cont.id, cont).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllContracts();
        this.modalService.dismissAll();
        this.toastrSuccess(" Contract updated successfully !! ");

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
    this.contratService.deleteContrat(this.id).subscribe({
      next: () => {
        console.log("Contract deleted !", this.id);
        this.ngOnInit();
        this.toastrSuccess("Contract delete successfully !! ");

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.contForm.reset();
  }
}
