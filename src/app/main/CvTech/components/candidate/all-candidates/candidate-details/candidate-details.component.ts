import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidate } from 'app/main/CvTech/models/candidate.model';
import { CandidateService } from 'app/main/CvTech/services/candidate.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {

  model: import("@ng-bootstrap/ng-bootstrap").NgbModalRef;

  modalOpenForm(modalForm) {
    this.model = this.modalService.open(modalForm);
  }

  constructor(private route: ActivatedRoute, private candidateService: CandidateService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  id: number = this.route.snapshot.params["candidat_id"];
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  candidate?: Candidate = {
    id: 0,
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adress: '',
    city: '',
    country: '',
    birthDate: new Date(),
    message: '',
    availability: ''
  };

  // added by saad.................. 

  form = new FormGroup({
    id: new FormControl(this.id),
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    country: new FormControl(''),
    city: new FormControl(''),
    birthDate: new FormControl(''),
    civility: new FormControl(''),
    message: new FormControl(''),
  });
  submitted = false;

  getCandidat() {
    this.candidateService.getbyid(this.id).subscribe(
      {
        next: (response: any) => {
          this.candidate = response;
          this.form = this.formBuilder.group(
            {
              name: [
                this.candidate.firstName,
                [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.pattern("[a-zA-Z ]*")
                ]
              ],
              birthDate: [this.candidate.birthDate, Validators.required],
              civility: [this.candidate.civility, Validators.required],
              country: [this.candidate.country, Validators.required],
              email: [this.candidate.email, [Validators.required, Validators.email]],
              phone: [
                this.candidate.phone,
                [
                  Validators.required,
                  Validators.pattern(/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g),

                ]
              ],
              city: [this.candidate.city,
              [
                Validators.required,
                Validators.pattern("[a-zA-Z ]*")
              ]
              ],
              adress: [this.candidate.adress, Validators.required],
              message: [
                this.candidate.message,
                [
                  Validators.required,
                  Validators.minLength(10),
                  Validators.maxLength(255)
                ]
              ],
            }
          );
        },
        error: (err) => {
          console.error(err);
        }
      }
    );

  }

  ngOnInit(): void {

    this.getCandidat();

    this.contentHeader = {
      headerTitle: 'Candidat Details',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/home'
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
            name: 'All Candidats',
            isLink: true,
            link: '/cvtech/candidats/allcandidats'
          },
          {
            name: 'Candidats Details',
            isLink: false,
            link: '/'
          }
        ]
      }
    };

    console.log(this.form.value);

  }



  updateCandidat(id: number): void {

    this.candidate = this.form.value;
    console.log(this.candidate);

    this.candidateService.update(this.candidate, id).subscribe({
      next: (data) => {
        this.model.close()
        console.log(data);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  //added by saad...........
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.updateCandidat(this.id);
    // console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
