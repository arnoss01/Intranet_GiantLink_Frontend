import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EntityDepartmentService } from 'app/main/company/services/entity-department.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamService } from 'app/main/company/services/team.service';
import { Team } from 'app/main/company/models/team.model';
import { EntityDepartment } from 'app/main/company/models/entity-department.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { locale as en } from '../../../i18n/en';
import { locale as fr } from '../../../i18n/fr';
import { CoreTranslationService } from '@core/services/translation.service';
import { Employee } from 'app/main/company/models/employee.model';
import { EmployeeService } from 'app/main/company/services/employee.service';


@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllTeamsComponent implements OnInit {
  team: Team = {
    id: null,
    teamName: '',
    teamDesc: '',
    departement_id: null,
    employees: null,
    departement:null
  }
  
  emp : Employee;
  idDepartment: any;
  departments?: EntityDepartment[];
  idEmployee : any;
  employees?: Employee[];
  teams: any;
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
    private departmentservice: EntityDepartmentService,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private _coreTranslationService: CoreTranslationService,
    private employeeService : EmployeeService) {
      this._coreTranslationService.translate(en, fr);
  }

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // ------------ Search ------------

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.teamName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.teams = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  // ------------ Get data ------------
  page = 1;
  count = 0;
  countEmp= 0;
  name = '';

  getAllteams() {
    const params = { page: this.page - 1, size: 5000, name: this.name };
    this.teamService.getTeams(params).subscribe(response => {
      const { content, totalElements } = response;
      // this.rows = content;
      this.count = totalElements;
      this.tempData = content;
      this.teams = content;
    }
    );
  }
  
  

  // ------------ Validation ------------

  public form: FormGroup = new FormGroup({
    teamName: new FormControl(''),
    teamDesc: new FormControl('')
  });

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  // ------------ Add Team ------------

  AddTeam(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.team = this.form.value;
    this.team.departement_id = this.idDepartment;
    this.createTeam(this.team);
  }

  createTeam(team: Team): void {
    this.teamService.createTeam(team).subscribe(
      {
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: 'Team has been saved with success',
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
    
    this.idDepartment = e.target.value;
    console.log("id dep",this.idDepartment);
    this.idEmployee = e.target.value;
    console.log("id Emp" + this.idEmployee);
  }

  // ------------ Edit Team ------------

  modalEdit(modalPrimaryedit, id) {
    this.teamService.getTeam(id).subscribe({
      next: (data) => {
        console.log("department team: ",data.departement);
        this.team = data;
        this.team.departement_id = this.idDepartment;
        this.form = this.formBuilder.group(
          {
            teamName: [
              this.team.teamName,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ],
            teamDesc: [
              this.team.teamDesc,
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

  updateTeam(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.team.teamName = this.form.value.teamName;
    this.team.teamDesc = this.form.value.teamDesc;
    this.team.departement_id = this.idDepartment;
    this.editTeam(this.team);
  }

  editTeam(team: Team): void {
    this.teamService.updateTeam(team.id, team).subscribe(
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
  // ------------ Modal Add team to employee ------------

  modalOpenAddEmployee(modalAddEmployeeTeam, id) {
    console.log(this.employees);
    this.teamService.getTeam(id).subscribe({
      next: (data) => {
        console.log("department team: ",data.departement);
        this.team = data;
        this.team.departement_id = this.idDepartment;
        this.form = this.formBuilder.group(
          {
            teamId: [
              this.team.id,
              [
                Validators.required,
                Validators.minLength(3)
              ]
            ]
          }
        );
      }, error: (err) => {
        console.error(err);
      }
    });
    this.modalService.open(modalAddEmployeeTeam, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
    
  }

  // ------------ Add team to employee ------------

  addEmployeeToTeam() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.employeeService.getEmployee(this.idEmployee).subscribe({
      next: (data) => {
        this.emp = data;
        this.emp.team_id = this.form.value.teamId;
      },
      error: (err) => {
        console.error(err);
      },
    });

    console.log(this.emp);
    console.log(this.form.value.teamId);
    console.log(this.idEmployee);
    this.employeeService.updateEmployee(this.idEmployee, this.emp).subscribe({
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
    console.log("Team ajouter");
  }


  // ------------ Delete Team ------------ 

  private modal = null;
  private idTeam = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.idTeam = id;
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }

  deleteTeam() {
    this.modal.close('Accept click');
    this.teamService.deleteTeam(this.idTeam).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  // ------------ GET departments for select ------------

  getDepartments(): void {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.departmentservice.getDepartments(params).subscribe(
      {
        next: (data) => {
          const { content, totalElements } = data;
          this.departments = content;
          this.count = totalElements;
          this.idDepartment = this.departments[0].id;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  // ------------ GET employees for select ------------

  getEmployees(): void {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.employeeService.getEmployees(params).subscribe(
      {
        next: (data) => {
          console.log(data.content);
          const { content, totalElements } = data;
          this.employees = data;
          this.countEmp = totalElements;
          this.idEmployee = this.employees[0].id;
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
    this.teamService.deleteMultipleTeam(this.ids).subscribe({
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
    this.getDepartments();
    this.getEmployees();
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
        teamName: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        teamDesc: [
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
