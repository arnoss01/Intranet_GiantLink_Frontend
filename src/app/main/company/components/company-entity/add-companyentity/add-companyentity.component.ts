import { Component, OnInit } from '@angular/core';
import { CompanyEntity } from '../../../models/company-entity.model';
import { Company } from '../../../models/company.model';
import { CompanyEntityService } from '../../../services/company-entity.service';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-add-companyentity',
  templateUrl: './add-companyentity.component.html',
  styleUrls: ['./add-companyentity.component.scss']
})
export class AddCompanyentityComponent implements OnInit {
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };
  companies?:Company[];

  idcompany:any;

  companyEntity: CompanyEntity = {
    id:null,
    name: '',
    timestamp:'',
    departements:[],
    company_id:null
  }
  
  constructor(private companyservice:CompanyService,private companyEntityService:CompanyEntityService) { }
  
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
            name: 'Company entity',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Company entity',
            isLink: false
          }
        ]
      }
    };
    this.getCompanies();
  }

  saveCompanyEntity(): void {
   const data = {
      name: this.companyEntity.name,
      company_id: this.idcompany
    }
    this.companyEntityService.createCompanyEntity(data).subscribe(
      {
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  onChange(e: any) {
    this.idcompany=e.target.value;
  }
  
  searchTitle = "";
  page = 1;
  count = 0;
  pageSize = 8;

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

  getCompanies(): void {
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.companyservice.getCompanies(params).subscribe(
      {
        next: (data) => {
          console.log(data);
          const { content, totalElements } = data;
          this.companies = content;
          this.count = totalElements;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }
}