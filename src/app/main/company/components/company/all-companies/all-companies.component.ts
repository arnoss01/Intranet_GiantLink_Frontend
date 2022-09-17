import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import Swal from "sweetalert2";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Company } from "../../../models/company.model";
import { CompanyService } from "../../../services/company.service";

@Component({
  selector: "app-all-companies",
  templateUrl: "./all-companies.component.html",
  styleUrls: ["./all-companies.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllCompaniesComponent implements OnInit {
  company: Company = {
    id: null,
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    webSite: "",
    timestamp: "",
    image: "",
    entities: [],
  };

  companies: any;
  submitted = false;

  isSelected: boolean = false;
  isDisabled: any;
  ids = [];
  public basicSelectedOption: number = 5;
  selectedList? = [];
  selectedListtest? = [];

  public contentHeader: object;
  private tempData = [];
  // public rows: any;

  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  constructor(
    private modalService: NgbModal,
    private companyService: CompanyService,
    private formBuilder: FormBuilder
  ) {}

  @ViewChild(DatatableComponent) table: DatatableComponent;

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.companies = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  page = 1;
  count = 0;
  name = "";
  // public totalPages = 0;

  public getCompanies(): void {
    const params = {
      page: this.page - 1,
      size: 5000,
      name: this.name,
    };
    this.companyService.getCompanies(params).subscribe({
      next: (response: any) => {
        const { content, totalElements } = response;
        this.count = totalElements;
        // this.totalPages = totalPages * 10;
        this.tempData = content;
        this.companies = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // ------------ Validation ------------

  public form: FormGroup = new FormGroup({
    name: new FormControl(""),
    address: new FormControl(""),
    email: new FormControl(""),
    phoneNumber: new FormControl(""),
    webSite: new FormControl(""),
    image: new FormControl(),
  });

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getCompanies();
    this.isDisabled = true;

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
            name: "Company",
            isLink: true,
            link: "/",
          },
          {
            name: "AllCompanies",
            isLink: false,
          },
        ],
      },
    };

    this.form = this.formBuilder.group({
      name: [
        this.company.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[A-zÀ-ú]/),
        ],
      ],
      webSite: [
        this.company.webSite,
        [
          Validators.required,
          Validators.pattern(
            // /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?%#[]@!\$&'()*\+,;=.]+$/
            //
            // /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/
            "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
          ),
        ],
      ],
      email: [
        this.company.email,
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      phoneNumber: [
        this.company.phoneNumber,
        [
          Validators.required,
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      address: [this.company.address, Validators.required],
    });
  }

  // ------------ Add Company ------------

  modalOpenPrimary(modalPrimary) {
    this.form.reset();
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }

  saveCompany(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {
      name: this.company.name,
      address: this.company.address,
      email: this.company.email,
      phoneNumber: this.company.phoneNumber,
      webSite: this.company.webSite,
    };
    this.companyService.createCompany(data).subscribe({
      next: (data) => {
        Swal.fire({
          icon: "success",
          title: "Team has been saved with success",
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

  // ------------ Edit Company ------------

  modalEdit(modalPrimaryedit, id) {
    this.companyService.getCompany(id).subscribe({
      next: (data) => {
        this.company = data;
        this.form = this.formBuilder.group({
          name: [
            this.company.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern(/[A-zÀ-ú]/),
            ],
          ],
          webSite: [
            this.company.webSite,
            [
              Validators.required,
              Validators.pattern(
                "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
              ),
            ],
          ],
          email: [
            this.company.email,
            [
              Validators.required,
              Validators.email,
              Validators.pattern(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            ],
          ],
          phoneNumber: [
            this.company.phoneNumber,
            [
              Validators.required,
              Validators.pattern("^[0-9]*$"),
              Validators.minLength(10),
              Validators.maxLength(10),
            ],
          ],
          address: [this.company.address, Validators.required],
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

  updateCompany(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    // this.company = this.form.value;
    this.company.name = this.form.value.name;
    this.company.address = this.form.value.address;
    this.company.email = this.form.value.email;
    this.company.phoneNumber = this.form.value.phoneNumber;
    this.company.webSite = this.form.value.webSite;
    this.editCompany(this.company);
  }

  editCompany(company: Company): void {
    this.companyService.updateCompany(company.id, company).subscribe({
      next: (data) => {
        // this.getCompanies();
        this.modalService.dismissAll("Cross click");
        this.ngOnInit();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private modal = null;
  private idcompany = 0;

  // ------------ Delete Company ------------

  modalOpenDanger(modalDanger, id: any) {
    this.idcompany = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }

  deleteCompany() {
    this.modal.close("Accept click");
    this.companyService.deleteCompany(this.idcompany).subscribe({
      next: () => {
        console.log("Company deleted !", this.idcompany);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // ------------ Check multiple deletion ------------

  onSelect({ selected }) {
    console.log("sel1", selected);
    //this.selectedList.splice(0,this.selectedList.length);
    while (this.selectedList.length > 0) {
      this.selectedList.pop();
    }
    console.log("sel2", selected);
    this.selectedList.push(...selected);
    console.log("sel3", selected);
    console.log("list", this.selectedList);
    // console.log("selected.length",selected.length);
    // selected.length=0;
    // console.log("selected.length",selected.length);
    if (this.selectedList.length != 0) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  deletemultiple() {
    this.ids.splice(0, this.ids.length);
    this.selectedList.forEach((item) => {
      this.ids.push(item.id);
    });
    console.log(this.ids);
    this.companyService.deleteMultipleTeam(this.ids).subscribe({
      next: () => {
        // location.reload();
        this.modalService.dismissAll("Cross click");
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  modalmultipledelete(modalDanger) {
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }
}
