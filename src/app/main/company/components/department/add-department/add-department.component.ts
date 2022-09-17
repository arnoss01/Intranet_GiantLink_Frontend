import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyEntity } from '../../../models/company-entity.model';
import { EntityDepartment } from '../../../models/entity-department.model';
import { CompanyEntityService } from '../../../services/company-entity.service';
import { CompanyService } from '../../../services/company.service';
import { EntityDepartmentService } from '../../../services/entity-department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  entities?: CompanyEntity[];
  departments?: EntityDepartment[];

  department: EntityDepartment = {
    id: null,
    name: '',
    timestamp: '',
    entity: null,
    entity_id: null
  }

  idcompanyEntity: any = "";
  countDep: any;

  constructor(private modalService: NgbModal,
    private companyservice: CompanyService,
    private departmentService: EntityDepartmentService,
    private companyEntityService: CompanyEntityService) { }
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Department',
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
            name: 'Department',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Department',
            isLink: false
          }
        ]
      }
    };
    this.getCompanyEntities();
    this.getAlldepartments()
  }

  saveDepartment(): void {
    const data = {
      name: this.department.name,
      entity_id: this.idcompanyEntity
    }

    this.departmentService.createDepartment(data).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.ngOnInit()
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  page = 1;
  count = 0;
  name = ''
  public pagePosition = 1;
  public totalPages=0;
  public chkBoxSelected = [];
  
  public pageChanged(event: any): void {
    this.page = event;
    this.getAlldepartments();
  }
  searchTitle = "";
  pageSize = 5;

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

  
  modalAdd(modalPrimaryAdd) {
    this.modalService.open(modalPrimaryAdd, {
      centered: true,
      windowClass: 'modal modal-primary'
    });
  }

  getAlldepartments(): void {
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.departmentService.getDepartments(params).subscribe(
      {
        next: (data) => {
          console.log(data);
          const { content, totalElements } = data;
          this.departments = content;
          this.idcompanyEntity = content[0].id;
          this.countDep = totalElements;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  getCompanyEntities(): void {
    const params = this.getParams(this.page, this.pageSize, this.searchTitle);
    this.companyEntityService.getCompanyentities(params).subscribe(
      {
        next: (data) => {
          console.log(data);
          const { content, totalElements } = data;
          this.entities = content;
          this.idcompanyEntity = content[0].id;
          this.count = totalElements;
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  onChange(e: any) {
    this.idcompanyEntity = e.target.value;
  }

}
