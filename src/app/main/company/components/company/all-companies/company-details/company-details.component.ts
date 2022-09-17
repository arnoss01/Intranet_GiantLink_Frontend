import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyEntity } from '../../../../models/company-entity.model';
import { Company } from '../../../../models/company.model';
import { CompanyService } from '../../../../services/company.service';
import { CompanyEntityService } from '../../../../services/company-entity.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  public contentHeader: object;

  company_id:any;
  company:Company;
  entities:Array<CompanyEntity>;
  companies?:Company[];

  constructor(private companyservice:CompanyService,
    private companyEntityService:CompanyEntityService,
    private route:ActivatedRoute,
    private modalService: NgbModal,
    private entityService:CompanyEntityService,
    private router:Router) {}

  ngOnInit() {
   
    this.company_id= this.route.snapshot.params["company_id"];
    this.getCompany(this.company_id)
    this.getCompanies();
    
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
            name: 'Company',
            isLink: true,
            link: '/'
          },
          {
            name: 'All Companies',
            isLink: true,
            link: '/companies/company/allcompanies'
          },
          {
            name: 'Company details',
            isLink: false
          }
        ]
      }
    };
  }

  // ------------ GET company details ------------

  getCompany(id:any):Company{
    this.companyservice.getCompany(id).subscribe({
      next:(data:any)=>{
        console.log(data);
        
        this.company=data;
        this.entities=data.companyEntityResponses;
    },
      error:(err) =>{
        console.error(err);
      }
    });
    return this.company;
  }

   // ------------ Add entity to company ------------

    entity: CompanyEntity = {
      id:null,
      name: '',
      timestamp:'',
      departements:[],
      company_id:null
    }

    modalAddentity(modalPrimaryAdd) {
      this.modalService.open(modalPrimaryAdd, {
        centered: true,
        windowClass: 'modal modal-primary'
      });
    }

    addentity(event:any): void {
      const data = {
         name: this.entity.name,
         company_id: this.company_id
       }
       this.entityService.createCompanyEntity(data).subscribe(
         { next: (data) => {
             this.ngOnInit();
           }, error: (err) => {
             console.error(err);
           }
         });
     }

      // ------------ Delete entity from company ------------

    deleteEntity(id: number): void {
      this.companyEntityService.deleteCompanyEntity(id).subscribe(
          data => {
            this.company=this.getCompany(this.company_id);
            this.entities=this.company.entities;
          },
          error => console.log(error));
    }

    // ------------ GET companies for select ------------

     getCompanies(): void {
      const params = this.getParams(this.page, this.pageSize, this.searchTitle);
      this.companyservice.getCompanies(params).subscribe(
        {
          next: (data) => {
            
            const { content, totalElements } = data;
            console.log(content);
            this.companies = content;
            this.count = totalElements;
          }, error: (err) => {
            console.error(err);
          }
        }
      );
    }

    // pagination and search

    searchTitle = "";
    page = 1;
    count = 0;
    pageSize = 8;
    name = ''
    public pagePosition = 1;
    public totalPages=0;
    public chkBoxSelected = [];

    public pageChanged(event: any): void {
      this.page = event;
      this.getCompanies();
    }
  
    getParams(page: number, pageSize: number, title: string) {
      let params: any = {};
      if (page) {
        params['page'] = page - 1;
        if (pageSize) {
          params['size'] = pageSize;
        }
        if (title) {
          params['name'] = title;
        }
        return params;
      }
    }

    public getentitiesofcompany(): void {
      const params = {
        page : this.page-1,
        size : 8,
        name : this.name
      }
      this.entityService.getentitiesofcompany(params).subscribe(
        {
          next: (response: any) => {
            const { content, totalElements, totalPages } = response;
            this.count = totalElements;
            this.totalPages = totalPages*10
            this.entities = this.company.entities
          }, error: (err) => {
            console.error(err);
          }
        }
      );
    }

    onSelect(row:any){
      this.router.navigate(['companies/company-entity/allentities/companyentity-details',row]);
    }
     
  
}
