import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { CompanyEntity } from '../../../../models/company-entity.model';
import { EntityDepartment } from '../../../../models/entity-department.model';
import { CompanyEntityService } from '../../../../services/company-entity.service';
import { CompanyService } from '../../../../services/company.service';
import { EntityDepartmentService } from '../../../../services/entity-department.service';

@Component({
  selector: 'app-companyentity-details',
  templateUrl: './companyentity-details.component.html',
  styleUrls: ['./companyentity-details.component.scss']
})
export class CompanyentityDetailsComponent implements OnInit {
  public contentHeader: object;

  entity_id:any;
  entity:CompanyEntity;
 
  departments:Array<EntityDepartment>;

  edit:EntityDepartment = {
    id:null,
    name: '',
    timestamp:'',
    entity:null,
    entity_id:null
  }

  entities?:CompanyEntity[];

  constructor(private companyservice:CompanyService,
    private companyEntityService:CompanyEntityService,
    private departmentService:EntityDepartmentService,
    private route:ActivatedRoute,
    private modalService: NgbModal) {}
 
  ngOnInit() {
 
    this.entity_id=this.route.snapshot.params["entity_id"];
    this.getCompanyEntity(this.route.snapshot.params["entity_id"]);
    this.getCompanyEntities();

    // content header
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
            name: 'Company entity details',
            isLink: false
          }
        ]
      }
    };
  }

  // ------------ GET Entity ------------

  getCompanyEntity(id:any):any{
    this.companyEntityService.getCompanyEntity(id).subscribe({
      next:(data:any)=>{
        console.log(data);
        
        this.entity=data;
        this.departments=data.departmentResponses;
    },
      error:(err) =>{
        console.error(err);
      }
    });
  }

  // ------------ pagination and search ------------

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
      this.getCompanyEntities();
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

    // ------------ Add department to entity ------------

    department: EntityDepartment = {
      id:null,
      name: '',
      timestamp:'',
      entity:null,
      entity_id:null
    }

    modalAddentity(modalPrimaryAdd) {
      this.modalService.open(modalPrimaryAdd, {
        centered: true,
        windowClass: 'modal modal-primary'
      });
    }
    
    saveDepartment(): void {
      const data = {
        name: this.department.name,
        entity_id: this.entity_id
      }
      this.departmentService.createDepartment(data).subscribe(
        {
          next: (data) => {
            this.ngOnInit();
          }, error: (err) => {
            console.error(err);
          }
        });
    }

    // ------------ Delete department from entity ------------

      deleteDepartment(id: number): void {
        this.departmentService.deleteDepartment(id)
          .subscribe(
            data => {
              this.entity=this.getCompanyEntity(this.entity_id);
              this.departments=this.entity.departements;
            },
            error => console.log(error));
        }

    // ------------ GET department ------------

  getDepartment(id:any):any{
    this.departmentService.getDepartment(id).subscribe({
      next:(data)=>{
        this.department=data;
    },
      error:(err) =>{
        console.error(err);
      }
    });
  }

  // ------------ GET entities for select ------------
  
  getCompanyEntities(): void {
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.companyEntityService.getCompanyentities(params).subscribe(
      {
        next: (data) => {
          const { content, totalElements } = data;
          this.entities = content;
          this.count = totalElements;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

}
