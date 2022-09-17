import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreTranslationService } from '@core/services/translation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityDepartment } from 'app/main/company/models/entity-department.model';
import Swal from 'sweetalert2';
import { locale as en } from '../../../i18n/en';
import { locale as fr } from '../../../i18n/fr';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Job } from 'app/main/company/models/job.model';
import { ProjectService } from 'app/main/company/services/project.service';
import { JobService } from 'app/main/company/services/job.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllJobsComponent implements OnInit {
  job: Job = {
    id: null,
    name: '',
    description: '',
    project:null,
    project_id:null
  }

  idProject: any;
  projects?: EntityDepartment[];
  jobs: any;
  submitted = false;
  
  isSelected: boolean = false;
  isDisabled: any;
  ids = [];
  public basicSelectedOption: number = 5;
  selectedList?= [];
  selectedListtest?= [];

  public contentHeader: object;
  private tempData = [];
  // public rows: any;
  
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;


  constructor(private modalService: NgbModal,
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private _coreTranslationService: CoreTranslationService) {
      this._coreTranslationService.translate(en, fr);
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // ------------ Search ------------

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.jobs = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // ------------ Get data ------------
  page = 1;
  count = 0;
  name = '';

  getAllteams() {
    const params = { page: this.page - 1, size: 5000, name: this.name };
    this.jobService.getJobs(params).subscribe(response => {
      const { content, totalElements } = response;
      // this.rows = content;
      this.count = totalElements;
      this.tempData = content;
      this.jobs = content;
    }
    );
  }

  // ------------ Validation ------------

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  });

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // ------------ Add Team ------------

  AddJob(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.job = this.form.value;
    this.job.project_id = this.idProject;
    this.createJob(this.job);
  }

  createJob(job: Job): void {
    this.jobService.createJob(job).subscribe(
      {
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Job has been saved with success',
            showConfirmButton: false,
            timer: 1500
          });
          this.modalService.dismissAll("Cross click");
          this.ngOnInit();
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  modalAdd(modalPrimaryAdd) {
    this.form.reset();
    this.modalService.open(modalPrimaryAdd, {
      centered: true,
      windowClass: 'modal modal-primary'
    });
  }

  onChange(e: any) {
    
    this.idProject = e.target.value;
    console.log("id project",this.idProject);
  }

  // ------------ Edit Team ------------

  modalEdit(modalPrimaryedit, id) {
    this.jobService.getJob(id).subscribe({
      next: (data) => {
        console.log("project team: ",data.project);
        this.job = data;
        this.job.project_id = this.idProject;
        this.form = this.formBuilder.group(
          {
            name: [
              this.job.name,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
            description: [
              this.job.description,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
          }
        );
      }, error: (err) => {
        console.error(err);
      }
    });
    this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
  }

  updateJob(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.job.name = this.form.value.name;
    this.job.description = this.form.value.description;
    this.job.project_id = this.idProject;
    this.editJob(this.job);
  }

  editJob(job: Job): void {
    this.jobService.updateJob(job.id, job).subscribe(
      {
        next: (data) => {
          this.modalService.dismissAll("Cross click");
          this.ngOnInit()
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  // ------------ Delete Team ------------ 

  private modal = null;
  private idJob = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.idJob = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  deleteJob() {
    this.modal.close('Accept click');
    this.jobService.deleteJob(this.idJob).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // ------------ GET departments for select ------------

  getprojects(): void {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.projectService.getProjects(params).subscribe(
      {
        next: (data) => {
          const { content, totalElements } = data;
          this.projects = content;
          this.count = totalElements;
          this.idProject = this.projects[0].id;
          console.log("projects",this.projects);
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  // ------------ Check multiple deletion ------------

  onSelect({ selected }) {
    //console.log("sel1",selected);
    this.selectedList.splice(0,this.selectedList.length);
    /*while(this.selectedList.length > 0) {
      this.selectedList.pop();
  }
  console.log("sel2",selected);*/
    this.selectedList.push(...selected);
   // console.log("sel3",selected);
  //  console.log("list",this.selectedList);
    // console.log("selected.length",selected.length);
    // selected.length=0;
    // console.log("selected.length",selected.length);
      if (this.selectedList.length != 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
  }

  /*onCheckedAll(allRowsSelected: any) {
    if (allRowsSelected) {
      this.selectedList.splice(0, this.selectedList.length);
      this.isDisabled = false;
      this.teams.forEach((team) => {
        this.selectedList.push(team.id);
      })
    } else {
      this.isDisabled = true;
    }
    console.log("total elements checked", this.selectedList)
  }*/

  deletemultiple() {
    this.ids.splice(0, this.ids.length);
    this.selectedList.forEach((item) => {
      this.ids.push(item.id)
    });
    this.jobService.deleteMultipleJob(this.ids).subscribe({
      next: () => {
        location.reload();
        //this.modalService.dismissAll("Cross click");
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    });  
  }

  modalmultipledelete(modalDanger) {
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  ngOnInit() {
    //this.isSelected = true;
    this.getAllteams()
    this.getprojects();
    this.isDisabled = true;

    this.contentHeader = {
      headerTitle: 'Company',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Companies',
            isLink: true,
            link: '/'
          },
          {
            name: 'Team',
            isLink: true,
            link: '/'
          },
          {
            name: 'All teams',
            isLink: false
          }
        ]
      }
    }

    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
          ]
        ]
      }
    );
  }

}
