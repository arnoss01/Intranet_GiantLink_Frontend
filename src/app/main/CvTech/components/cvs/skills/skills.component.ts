import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Skill } from "app/main/CvTech/models/skill.model";
import { SkillService } from "../../../services/skill.service";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SkillsComponent implements OnInit {

  public skill: Skill = {
    id: null,
    name: "",
    description: "",
  };


  public basicSelectedOption = 5;
  public ColumnMode = ColumnMode;

  page = 1;
  count = 0;
  name = "";
  description = "";


  private modal = null;
  private id = 0;

  public contentHeader: object;
  public pagePosition = 1;
  public totalPages = 0;

  public data?: Skill[];

  submitted = false;

  public skillForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
  });

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private skillService: SkillService) { }



  ngOnInit(): void {
    this.getData();

    this.contentHeader = {
      headerTitle: "Skills",
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
            name: "Skills",
            isLink: false,
          },
        ],
      },
    };

  }

  modalOpen(modalBasic) {
    this.skillForm = this.formBuilder.group({
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
      ],
    });
    this.modalService.open(modalBasic, {
      centered: true,
      windowClass: "modal modal-primary",
      size: "lg",
    });
  }


  public pageChanged(event: any): void {
    this.page = event;
    console.log(event);
    this.getData();
  }

  getData(): void {
    const params = {
      page: this.page - 1,
      size: 4,
      name: this.name,
      description: this.description,
    };

    this.skillService.getAllPagination(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.data = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.skillForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.skillForm.invalid) {
      return;
    }
    this.skill = this.skillForm.value;

    this.addData();
  }

  onReset(): void {
    this.submitted = false;
    this.skillForm.reset();
  }


  public addData(): void {
    const skillData = {
      name: this.skill.name,
      description: this.skill.description,
    };
    this.skillService.addSkill(skillData).subscribe({
      next: (data) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
    this.emptyfields();
  }

  // ------------ Edit skill ------------

  modalEdit(modalPrimaryedit, id) {
    this.skillService.getSkill(id).subscribe({
      next: (data) => {
        this.skill = data;
        this.skillForm = this.formBuilder.group({
          name: [
            this.skill.name,
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("[a-zA-Z ]*"),
            ],
          ],
          description: [
            this.skill.description,
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
    });
  }


  edit(): void {
    if (this.skillForm.invalid) {
      return;
    }
    this.skill.name = this.skillForm.value.name;
    this.skill.description = this.skillForm.value.description;

    this.updateSkill(this.skill);
  }

  updateSkill(skill: Skill): void {
    this.skillService.updateSkill(skill.id, skill).subscribe({
      next: (data) => {
        console.log(data);
        this.getData();
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.emptyfields();
  }

  // ------------- delete -------------- //

  modalOpenDanger(modalDanger, id: any) {
    this.id = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: "modal modal-danger",
    });
  }


  public deleteData() {
    console.log(this.id);

    this.modal.close("Accept click");
    this.skillService.deleteSkill(this.id).subscribe({
      next: () => {
        console.log("Skill deleted !", this.id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  emptyfields() {
    this.skillForm = this.formBuilder.group({
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

}
