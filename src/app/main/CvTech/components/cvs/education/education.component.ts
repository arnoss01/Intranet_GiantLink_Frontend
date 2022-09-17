import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Education } from "app/main/cvtech/models/education.model";
import { EducationService } from "app/main/CvTech/services/education.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-education",
  templateUrl: "./education.component.html",
  styleUrls: ["./education.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class EducationComponent implements OnInit {

  public data?: Education[];
  public educationAdd: Education = { id: 0, name: "", description: ""};

  public totalPages = 0;
  public page = 1;
  public basicSelectedOption = 5;
  
  public name = "";
  public submitted = false;
  public ColumnMode = ColumnMode;
  private modal = null;
  private id = 0;
  public contentHeader: Object;
 

  public educForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),

  });

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private educationService: EducationService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getAllEducations();
    this.contentHeader = {
      headerTitle: "Education",
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
            name: "Education",
            isLink: false,
          },
        ],
      },
    };
  }


  public pageChanged(event: any): void {
    this.page = event;
    this.getAllEducations();
  }

  getAllEducations(): void {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };

    this.educationService.getAllPagination(params).subscribe({
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

 

  modalOpen(modalBasic) {

    this.educForm = this.formBuilder.group({
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
      ]
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
    return this.educForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.educForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")

      return;
    }
    this.educationAdd = this.educForm.value;

    this.addEducation();
  }

  public addEducation(): void {
    console.log(this.educationAdd);
    const educationData = {
      name: this.educationAdd.name,
      description: this.educationAdd.description,
    };
    this.educationService.addEducation(educationData).subscribe({
      next: (data) => {
        this.modalService.dismissAll();
        this.ngOnInit();
        this.modalService.dismissAll();
        this.toastrSuccess(" Education added successfully !! ");


      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
    this.emptyfields();
  }

  // ------------ Edit education ------------

  modalEdit(modalPrimaryedit, id) {
    this.educationService.getEducation(id).subscribe({
      next: (data) => {
        this.educationAdd = data;
        this.educForm = this.formBuilder.group({
          name: [
            this.educationAdd.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ],
          description: [
            this.educationAdd.description,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(45),
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
    if (this.educForm.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")

      return;
    }
    this.educationAdd.name = this.educForm.value.name;
    this.educationAdd.description = this.educForm.value.description;
  
    this.updateEducation(this.educationAdd);
  }

  updateEducation(edu: Education): void {
    this.educationService.updateEducation( edu.id , edu).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllEducations();
        this.modalService.dismissAll();
        this.toastrSuccess(" Education updated successfully !! ");

      },
      error: (err) => {
        console.error(err);
      },
    });
    this.emptyfields();
  }

  emptyfields() {
    this.educForm = this.formBuilder.group({
      name: [
        '',
      ]
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
    this.educationService.deleteEducation(this.id).subscribe({
      next: () => {
        console.log("Education deleted !", this.id);
        this.ngOnInit();
        this.toastrSuccess(" Education deleted successfully !! ");

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReset(): void {
    this.submitted = false;
    this.educForm.reset();
  }
}
