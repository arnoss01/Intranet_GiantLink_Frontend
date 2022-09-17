import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Project } from "../../models/project.model";
import { ProjectService } from "../../services/project.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent implements OnInit {
  public contentHeader: object;
  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate | null;
  public toDate: NgbDate | null;
  public today = this.calendar.getToday();

  project: Project = {
    id: null,
    projectName: "",
    projectType: "",
    status: null,
    startDate: null,
    finishDate: null,
    teams: null,
  };

  isDisabled: boolean = true;
  ids = [];
  basicSelectedOption = 10;
  projects: Project[] = [];
  idDelete: number;
  isUpdate: number;
  projectStatus: boolean;
  submitted = false;

  public ColumnMode = ColumnMode;

  page = 1;
  count = 5;
  name = "";

  private modal = null;
  $swal: any;

  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {}

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public form: FormGroup = new FormGroup({
    projectName: new FormControl(""),
    projectType: new FormControl(""),
    startDate: new FormControl(""),
    finishDate: new FormControl(""),
  });

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public formEdit: FormGroup = new FormGroup({
    projectName: new FormControl(""),
    projectType: new FormControl(""),
    startDate: new FormControl(""),
    finishDate: new FormControl(""),
  });

  get formEditControl(): { [key: string]: AbstractControl } {
    return this.formEdit.controls;
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.contentHeader = {
      headerTitle: "Vente",
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
            name: "Project",
            isLink: false,
          },
        ],
      },
    };

    this.form = this.formBuilder.group({
      projectName: ["", [Validators.required, Validators.minLength(3)]],
      projectType: ["", [Validators.required, Validators.minLength(3)]],
      startDate: ["", [Validators.required, Validators.minLength(3)]],
      finishDate: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  filterUpdate(event) {
    this.name = event.target.value.toLowerCase();
    this.getAllProjects();
  }

  public pageChanged(event: any): void {
    this.page = event;
  }

  getAllProjects() {
    const params = {
      page: this.page - 1,
      size: this.basicSelectedOption,
      name: this.name,
    };
    console.log(params);
    this.projectService.getProjects(params).subscribe((response) => {
      const { content, totalElements } = response;
      this.projects = content;
      console.log(this.projects);
    });
  }

  createProject() {
    this.project.projectName = this.form.value.projectName;
    this.project.projectType = this.form.value.projectType;
    this.project.startDate = new Date(
      this.form.value.startDate.year,
      this.form.value.startDate.month,
      this.form.value.startDate.day
    );
    this.project.finishDate = new Date(
      this.form.value.finishDate.year,
      this.form.value.finishDate.month,
      this.form.value.finishDate.day
    );
    console.log("hana" + this.project);
    this.projectService.createProject(this.project).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  updateProject(): void {
    this.project.projectName = this.form.value.projectName;
    this.project.projectType = this.form.value.projectType;
    this.project.startDate = new Date(
      this.form.value.startDate.year,
      this.form.value.startDate.month,
      this.form.value.startDate.day
    );
    this.project.finishDate = new Date(
      this.form.value.finishDate.year,
      this.form.value.finishDate.month,
      this.form.value.finishDate.day
    );
    console.log("hana" + this.project);
    this.projectService.updateProject(this.isUpdate, this.project).subscribe({
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

  modalOpenDanger(id: any, status: boolean) {
    this.isUpdate = id;
    this.projectStatus = status;
    //this.modal = modalDanger;
    //this.modalService.open(modalDanger, {
    //  centered: true,
    // windowClass: 'modal modal-danger'
    // });
  }

  changeProjectStatus() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ml-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          icon: "success",
          title: "Changed!",
          text: "Your project status has been changed.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });

        this.projectService
          .changeStatus(this.isUpdate, this.projectStatus)
          .subscribe({
            next: () => {
              this.getAllProjects();
              //this.modal.close('Accept click');
            },
            error(err) {
              console.log(err);
            },
          });
      }
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.idDelete).subscribe({
      next: () => {
        this.getAllProjects();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.project.startDate = new Date(date.year, date.month - 1, date.day);
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
      this.project.finishDate = new Date(date.year, date.month - 1, date.day);
    } else {
      this.toDate = null;
      this.fromDate = date;
      console.log(this.fromDate);
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  modalOpen(modalBasic) {
    this.modalService.open(modalBasic, {
      centered: true,
      size: "lg",
    });
  }

  modalEdit(modalPrimaryedit, id) {
    this.projectService.getProject(id).subscribe({
      next: (data) => {
        this.isUpdate = id;
        this.formEdit.value.projectName = data.projectName;
        this.formEdit.value.projectType = data.projectType;
        this.formEdit.value.startDate = data.startDate;
        this.formEdit.value.finishDate = data.finishDate;

        let sd = this.project.startDate.toString().split("-");
        let fd = this.project.finishDate.toString().split("-");

        let ds = Number(sd[0]);
        let ms = Number(sd[1]);
        let ys = Number(sd[2]);

        let df = Number(fd[0]);
        let mf = Number(fd[1]);
        let yf = Number(fd[2]);

        this.form = this.formBuilder.group({
          projectName: [
            this.project.projectName,
            [Validators.required, Validators.minLength(3)],
          ],
          projectType: [
            this.project.projectType,
            [Validators.required, Validators.minLength(3)],
          ],
          startDate: [
            {
              year: ys,
              month: ms,
              day: ds,
            },
            [Validators.required, Validators.minLength(3)],
          ],
          finishDate: [
            {
              year: yf,
              month: mf,
              day: df,
            },
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
      size: "lg",
      windowClass: "modal modal-primary",
    });
  }

  // confirm texrt
  confirmText() {
    this.$swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ml-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        this.$swal({
          icon: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  }
}
