import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidate } from 'app/main/CvTech/models/candidate.model';
import { CandidateService } from 'app/main/CvTech/services/candidate.service';

@Component({
  selector: 'app-all-candidates',
  templateUrl: './all-candidates.component.html',
  styleUrls: ['./all-candidates.component.scss']
})
export class AllCandidatesComponent implements OnInit {



  public pagePosition = 1;
  public totalPages = 0;
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  public chkBoxSelected = [];

  constructor(private modalService: NgbModal, private candidateService: CandidateService) { }


  ngOnInit(): void {

    // this.getData()
    this.getAllUsers();

    this.contentHeader = {
      headerTitle: 'All Candidats',
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
            name: 'All Candidats',
            isLink: false
          }
        ]
      }
    };
  }

  modalOpenPrimary(modalPrimary) {
    this.modalService.open(modalPrimary, {
      centered: true,
      windowClass: 'modal modal-primary'
    });
  }

  page = 1;
  count = 0;
  public sizeSelect: number = 2;
  email = '';
  phone = '';
  name = ''

  public pageChanged(event: any): void {
    this.page = event;
    console.log(event);
    this.getAllUsers();
  }

  getParams(page: number, pageSize: number, email: string, phone: string, name: string) {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }
    if (email) {
      params['email'] = email;
    }
    if (phone) {
      params['phone'] = phone;
    }
    if (name) {
      params['name'] = name;
    }

    return params;
  }
  Users?: Candidate[];

  getAllUsers(): void {
    const params = {
      page: this.page - 1,
      size: this.sizeSelect,
      email: this.email,
      phone: this.phone,
      name: this.name
    }

    this.candidateService.getAllPagination(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          this.totalPages = totalPages * 10
          this.Users = response.content
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }


  private modal = null;
  private id = 0;

  modalOpenDanger(modalDanger, id: any) {
    this.id = id
    this.modal = this.modalService.open(modalDanger, {
      centered: true,
      windowClass: 'modal modal-danger'
    });
  }
  // ------------- delete candidat 
  deleteCandidat() {
    console.log(this.id);

    this.modal.close('Accept click')
    window.location.reload();
    this.candidateService.DeleteCandidatById(this.id).subscribe({
      next: () => {
        console.log("Campaigns , deleted !", this.id);
        this.ngOnInit();

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
