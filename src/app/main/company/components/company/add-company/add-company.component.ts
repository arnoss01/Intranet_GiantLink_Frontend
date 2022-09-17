import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  company: Company = {
    id: null,
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    webSite: '',
    image: '',
    entities: [],
    timestamp:''
  }

  public form: FormGroup = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    webSite: new FormControl(''),
    image: new FormControl(),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private companyservice: CompanyService) { }


  ngOnInit(): void {
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
            name: 'Company',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Company',
            isLink: false
          }
        ]
      }
    };

    this.form = this.formBuilder.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z]*")
          ]
        ],
        webSite: ['',Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\+|0{1,2}]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
          ]
        ],
        address: ['', Validators.required]
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
    this.company = this.form.value;

    this.saveCompany(this.company);

  }
  saveCompany(company: Company): void {

    this.companyservice.createCompany(company).subscribe(
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
      });
  }

}
