import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Candidate } from 'app/main/CvTech/models/candidate.model';
import { CandidateService } from 'app/main/CvTech/services/candidate.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-candidat',
  templateUrl: './add-candidat.component.html',
  styleUrls: ['./add-candidat.component.scss']
})
export class AddCandidatComponent implements OnInit {
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  public candidate: Candidate = {
    id: 0,
    civility: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phone: undefined,
    adress: undefined,
    city: undefined,
    country: undefined,
    birthDate: undefined,
    message: undefined,
    availability: undefined
  }

  modalOpenForm(modalForm) {
    //this.model = this.modalService.open(modalForm);
  }

  public form: FormGroup = new FormGroup({
    civility: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    adress: new FormControl(''),
    city: new FormControl(),
    country: new FormControl(false),
    birthDate: new FormControl(false),
    message: new FormControl(false),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private candidatService: CandidateService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.contentHeader = {
      headerTitle: 'Add Candidat',
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
            name: 'CvTech',
            isLink: true,
            link: '/'
          },
          {
            name: 'Candidats',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Candidat',
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
            Validators.pattern("[a-zA-Z ]*")
          ]
        ],
        message: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(255)
          ]
        ],
        birthDate: ['', Validators.required],
        civility: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g),

          ]
        ],
        city: ['',
          [
            Validators.required,
            Validators.pattern("[a-zA-Z ]*")
          ]
        ],
        adress: ['', Validators.required]
      }
    );


  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.candidate = this.form.value;

    this.addNewCandidat();

  }
  private addNewCandidat() {
    this.candidatService.addCandidat(this.candidate).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl("/cvtech/candidats/allcandidats");
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}