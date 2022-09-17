import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'app/main/company/models/employee.model';
import { Team } from 'app/main/company/models/team.model';
import { EmployeeService } from 'app/main/company/services/employee.service';
import { TeamService } from 'app/main/company/services/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  employee: Employee = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: 0,
    hireDate:undefined,
    team_id:15
  }

  public form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    hireDate: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder,
     private employeeService: EmployeeService,
     private teamService :TeamService) { }


  ngOnInit(): void {
    this.selectBasicMethod();
    this.getTeams();
    this.contentHeader = {
      headerTitle: 'Companies',
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
            name: 'Employee',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Employee',
            isLink: false
          }
        ]
      }
    };

    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z]*")
          ]
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z]*")
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\+|0{1,2}]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),

          ]
        ],
        hireDate: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
      }
    );
  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      
      return;
    }
    this.employee = this.form.value;

    this.saveEmployee(this.employee);

  }
  saveEmployee(employee: Employee): void {
    /*employee.team_id=4;
      console.log("save employee",employee.team_id);
    this.employeeService.createEmployee(employee).subscribe(
      {
        next: (data) => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit()
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });*/
      console.log("educ selected" , this.educationSelected)
  }

   // ------------ GET teams for select ------------

   teams : Team[];
   page = 1;
   count = 0;
   name = '';
   idTeam: any;
   public selectBasic: Team[] = [];
   public selectBasicLoading = false;

   private selectBasicMethod() {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.selectBasicLoading = true;
    
    this.teamService.getTeams(params).subscribe(  {
      next: (data) => {
        const { content, totalElements } = data;
        this.selectBasic  = content;
        this.count = totalElements;
        this.idTeam = this.teams[0].id;
        this.selectBasicLoading = false;
        console.log("teams: ", this.teams);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  public educationSelected;

   getTeams(): void {
    const params = { page: this.page - 1, size: 8, name: this.name };
    this.teamService.getTeams(params).subscribe(
      {
        next: (data) => {
          const { content, totalElements } = data;
          this.teams = content;
          this.count = totalElements;
          this.idTeam = this.teams[0].id;
          console.log("teams: ", this.teams);
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  selectAddTagMethod(teamName) {
    return { teamName: teamName, tag: true };
  }

}
