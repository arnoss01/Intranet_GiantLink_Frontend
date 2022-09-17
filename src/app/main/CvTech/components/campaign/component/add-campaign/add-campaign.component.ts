import { Region } from './../../../../models/region.model';
import { RegionService } from './../../../../services/region.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { CampaignService } from 'app/main/CvTech/services/campaign.service';


import Swal from 'sweetalert2';
import { Campaign } from 'app/main/CvTech/models/campaign.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCampaignComponent implements OnInit {
  public contentHeader: object;
  public compaignAdd : Campaign = { id:0 , name: "", description: "",nbPositions: 0 , closingDate: null , regionsIds:[11,11]  };
  public regions: Region[];

  constructor(
    private AllCampaignService: CampaignService,
    private router: Router,

     private regionService: RegionService
  ) { }
  public campForm: FormGroup = new FormGroup({ 
    name: new FormControl(""),
    description: new FormControl(""),
    campaignId: new FormControl(""),
    nbPositions: new FormControl(""),
    closingDate: new FormControl(""),
    regionsIds:new FormControl(""),
  });
  public submitted = false;

  ngOnInit(): void {
    
    this.contentHeader = {
      headerTitle: "Add Campaign",
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
            name: "Campaign",
            isLink: true,
            link: "/",
          },
          {
            name: "Add Campaign",
            isLink: false,
          },
        ],
      },
    };
    this.getallregion();
  }
  getallregion(): void {
    this.regionService.getRegions().subscribe({
      next: (value: any) => {
        this.regions = value;
      },
    })
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.campForm.invalid) {
      return;
    }
    this.compaignAdd = this.campForm.value;

    this.addCompaign();
  }
  public addCompaign(): void {
   
    const compaignData = {
      name: this.compaignAdd.name,
      description: this.compaignAdd.description,
      nbPositions:this.compaignAdd.nbPositions,
      closingDate:this.compaignAdd.closingDate,
      regionsIds:this.compaignAdd.regionsIds,
    };
   
    this.AllCampaignService.addCampaign(compaignData).subscribe({
      next: (data) => {
        console.log(data );
        this.router.navigateByUrl("/allcampaigns");

      },
      error: (err) => {
        console.error(err);
        alert(err.message);
      },
    });
  }

}


