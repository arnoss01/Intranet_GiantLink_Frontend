import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Campaign } from 'app/main/CvTech/models/campaign.model';
import { Candidate } from 'app/main/CvTech/models/candidate.model';
import { Cv } from 'app/main/CvTech/models/cv.model';
import { Domain } from 'app/main/CvTech/models/domain.model';
import { Education } from 'app/main/cvtech/models/education.model';
import { GlobalExperience } from 'app/main/CvTech/models/global-experience.model';
import { Language } from 'app/main/CvTech/models/language.model';
import { Skill } from 'app/main/CvTech/models/skill.model';
import { CvService } from 'app/main/CvTech/services/cv.service';
import Stepper from 'bs-stepper';
import { repeaterAnimation } from './add-cv.animation';

@Component({
  selector: 'app-add-cv',
  templateUrl: './add-cv.component.html',
  styleUrls: ['./add-cv.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [repeaterAnimation]
})
export class AddCvComponent implements OnInit {

  public contentHeader: object;

  pageSize = 5;
  page = 1;

  candidates?: Candidate[];
  educations?: Education[];
  languages?:Language[];
  skills?:Skill[];
  experiences?: GlobalExperience[];
  domains?: Domain[];
  campaigns?: Campaign[];

  candidate:Candidate = {
    id:0,
    civility: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    adress: '',
    city: '',
    country: '',
    birthDate: new Date,
    availability: '',
    message: ''
  }

  education:Education = {
    id:0,
    name: '',
    description: ''
  }

  language:Language = {
    id: 0,
    name: '',
    description: ''
  }

  skill:Skill = {
    id: 0,
    name: '',
    description: ''
  }

  experience:GlobalExperience = {
    id: 0,
    name: '',
    description: ''
  }

  domain:Domain = {
    id: 0,
    name: '',
    duration: 0
  }

  cv : Cv = {
    id: 0,
    availability: '',
    comment: '',
    candidateId:0,
    domainsId: [],
    skillsId:[],
    globalExperiencesId: [],
    educationsId: [],
    languagesId: [],
    candidaciesId: [],
  }

  public items = [{ campanyName: '', description:'', startDate: '', endDate: '' }];

  public item = {
    campanyName: '',
    description:'',
    startDate: '',
    endDate: ''
  };


  // private
  private modernWizardStepper: Stepper;
  private bsStepper;

   
    modernHorizontalNext() {
      this.modernWizardStepper.next();
    }
    modernHorizontalPrevious() {
      this.modernWizardStepper.previous();
    }

    onSubmit() {
      alert('Submitted!!');
      return false;
    }

  constructor( private cvService: CvService) { }

  addItem() {
    this.items.push({
      campanyName: '',
      description: '',
      startDate: '',
      endDate: ''
    });
  }

/**DeleteItem  * @param id */
 deleteItem(id) {
  for (let i = 0; i < this.items.length; i++) {
    if (this.items.indexOf(this.items[i]) === id) {
      this.items.splice(i, 1);
      break;
    }
  }
}

  ngOnInit(): void {

    this.getCandidates();
    this.getEducations();
    this.getLanguages();
    this.getSkills();
    this.getGlobalExperience();
    this.getDomains();
    this.getCampaigns();

    this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
      linear: false,
      animation: true
    });

    this.bsStepper = document.querySelectorAll('.bs-stepper');

    // content header
    this.contentHeader = {
      headerTitle: 'Form Wizard',
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
            name: 'Forms',
            isLink: true,
            link: '/'
          },
          {
            name: 'Form Wizard',
            isLink: false
          }
        ]
      }
    };

  }

  getCandidates(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getCandidates(params).subscribe({
      next:(data:any)=>{
        this.candidates=data.content;
      }
    })
  }

  getEducations(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getEducations(params).subscribe({
      next:(data:any)=>{
        this.educations=data.content;
      }
    })
  }

  getLanguages(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getLanguages(params).subscribe({
      next:(data:any)=>{
        this.languages=data.content;
      }
    })
  }

  getSkills(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getSkills(params).subscribe({
      next:(data:any)=>{
        this.skills=data.content;
      }
    })
  }

  getGlobalExperience(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getGlobalExperience(params).subscribe({
      next:(data:any)=>{
        this.experiences=data.content;
      }
    })
  }

  getDomains(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getDomains(params).subscribe({
      next:(data:any)=>{
        this.domains=data.content;
      }
    })
  }

  getCampaigns(){
    const params = {
      page: this.page - 1,
      size: this.pageSize,
    }
    this.cvService.getCampaigns(params).subscribe({
      next:(data:any)=>{
        this.campaigns=data.content;
      }
    })
  }

}

