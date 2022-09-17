import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Candidate } from 'app/main/CvTech/models/candidate.model';
import { CampaignService } from 'app/main/CvTech/services/campaign.service';
import { CandidateService } from 'app/main/CvTech/services/candidate.service';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private AllCampaignService: CampaignService,
    private modalService: NgbModal,
    private AllCandidatService: CandidateService,
  ) { }

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  // -------------------- pagination & search
  page = 1;
  count = 0;
  name = '';
  email = '';
  phone = '';
  public pagePosition = 1;
  public totalPages = 0;

  public pageChanged(event: any): void {
    this.page = event;
    this.getCandidats();
  }

  getParams(page: number, pageSize: number, name: string, email: string, phone: string) {
    let params: any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (pageSize) {
      params['size'] = pageSize;
    }
    if (name) {
      params['name'] = name;
    }
    if (email) {
      params['email'] = email;
    }
    if (phone) {
      params['phone'] = phone;
    }

    return params;
  }

  // ------- Get All Candidats ------- //
  Postulations?: any[];
  postulatedCandidats: Candidate[] = [];

  Candidats?: Candidate[];
  public getCandidats() {
    const params = {
      page: this.page - 1,
      size: 5,
      name: this.name,
      email: this.email,
      phone: this.phone
    }
    this.AllCandidatService.getAllPagination(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          this.totalPages = totalPages * 10;
          this.Candidats = response.content;
          this.postulatedCandidats = []

          this.Postulations.forEach(p => {
            this.postulatedCandidats.push(p.candidat);
          })
          this.postulatedCandidats.forEach(candid => {
            this.Candidats.forEach((candidat, index) => {
              if (candidat.id == candid.id) {
                this.Candidats.splice(index, 1);
              }
            })
          });
        }
      }
    )
  }

  private candidatIds = []
  // recupere les candidat selectionee 
  public onCheckboxChange(event: any): void {
    const idExistInCandidatIds = this.candidatIds.includes(event.target.id)
    if (event.target.checked && !idExistInCandidatIds) {

      this.candidatIds.push(event.target.id);

    } else {
      this.candidatIds.forEach((id, index) => {
        event.target.id === id ? this.candidatIds.splice(index, 1) : null;
      })
    }
  }

  // modal Open Small
  modalOpenSM(modalSM) {
    this.modalService.open(modalSM, {
      centered: true,
      size: 'xl'
    });
  }

  // ------- Get One Campaign By Id ------- //
  campainId: number = this.route.snapshot.params["campaign_id"];
  Campaign?: any;
  getCampaign() {
    this.AllCampaignService.getbyid(this.campainId).subscribe(
      {
        next: (response: any) => {
          this.Campaign = response;
          this.Postulations = response.postulation;
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }

  // ------- Postulation ---------- //
  postulation: any;
  postulatCandidat(): void {
    console.log(this.candidatIds);
    this.candidatIds.forEach(id => {
      const data = {
        date_postulation: Date.now(),
        status: '',
        candidat_id: Number.parseInt(id),
        campaign_id: this.campainId,
      };

    });
    console.log(this.candidatIds);
    this.candidatIds = [];

  }

  // ---------- Delete Selected Candidats ------------ //


  ngOnInit(): void {
    this.getCampaign();
    // //
    this.getCandidats();
    // //

    this.contentHeader = {
      headerTitle: 'Campaign Details',
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
            name: 'Campaign',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Campaigns',
            isLink: true,
            link: '/cvtech/campaign/allcampaigns'
          },
          {
            name: 'Campaigns Details',
            isLink: false,
            link: '/'
          }
        ]
      }
    };

  }

}
