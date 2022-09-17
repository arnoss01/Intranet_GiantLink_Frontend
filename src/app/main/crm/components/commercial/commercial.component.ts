import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Commercial } from '../../models/commercial.model';
import { CommercialService } from '../../services/commercial.service';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.scss']
})
export class CommercialComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  commercials?: Commercial[];
  pageSize = 5;



  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;

  commercial: Commercial = {
    id: null,
    commercialName: '',
    statut: null,
    leads: []
  }


  editCommercial: Commercial = {
    id: null,
    commercialName: '',
    statut: null,
    leads: []
  }



  public form: FormGroup = new FormGroup({
    commercialName: new FormControl(''),
    statut: new FormControl(''),
  });


  public formEdit: FormGroup = new FormGroup({
    commercialName: new FormControl(''),
    statut: new FormControl(''),
  });


  submitted = false;
  constructor(private modalService: NgbModal,
    private commercialService: CommercialService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Commercial',
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
            name: 'Commercials',
            isLink: true,
            link: '/'
          },
          {
            name: 'Commercial',
            isLink: true,
            link: '/'
          },
          {
            name: 'AllCommercials',
            isLink: false
          }
        ]
      }
    };
    this.getCommercials();

  }

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get EditFormControl(): { [key: string]: AbstractControl } {
    return this.formEdit.controls;
  }

  //  pagination & search

  @ViewChild(DatatableComponent) table: DatatableComponent;

  page = 1;
  count = 5;
  searchCommercial = '';




  filterByName(event) {
    this.searchCommercial = event.target.value.toLowerCase();
    this.getCommercials();
  }

  public pageChanged(event: any): void {
    this.page = event;
    this.getCommercials();
  }

  public getCommercials(): void {
    const params = {
      page: this.page - 1,
      size: this.pageSize,
      name: this.searchCommercial
    }
    this.commercialService.getCommercials(params).subscribe(
      {
        next: (response: any) => {
          const { content, totalElements, totalPages } = response;
          this.count = totalElements;
          //this.totalPages = totalPages * 10
          this.commercials = response.content
          console.log(this.commercials)
        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

  //Edit 

  modalEdit(modalPrimaryedit, id) {
    console.log(id);
    this.commercialService.getCommercial(id).subscribe({
      next: (data) => {
        console.log(data)
        this.editCommercial.id = data.id;
        this.editCommercial.commercialName = data.commercialName;
        this.editCommercial.statut = data.statut;
        this.formEdit = this.formBuilder.group(
          {
            commercialName: [
              this.editCommercial.commercialName,
              [
                Validators.required,
                Validators.minLength(3),
                Validators.pattern("[a-zA-Z ]*")
              ]
            ],
            statut: [this.editCommercial.statut, Validators.required],

          }
        );
      }, error: (err) => {
        console.error(err);
      }
    });
    this.modal = this.modalService.open(modalPrimaryedit, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
  }





  // Add

  modalAdd(modalPrimaryadd, addedCommercial) {

    console.log(addedCommercial);


    this.form = this.formBuilder.group(
      {
        commercialName: [
          addedCommercial.commercialName,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z ]*")
          ]
        ],
        statut: [addedCommercial.statut, Validators.required],

      }
    )

    this.modal = this.modalService.open(modalPrimaryadd, {
      centered: true,
      windowClass: 'modal modal-primary',
    });
  }





  private modal = null;

  onEditSubmit(): void {
    if (this.formEdit.invalid) {
      console.log(this.formEdit.value);
      this.toastrWarning("Oooops!! Something went wrong .")
      return;
    }
    this.editCommercial.commercialName = this.formEdit.value.commercialName;
    this.editCommercial.statut = this.formEdit.value.statut;
    console.log(this.editCommercial);
    this.updateCommercial(this.editCommercial);


  }

  onAddSubmit(): void {
    if (this.form.invalid) {
      this.toastrWarning("Oooops!! Something went wrong .")
      console.log(this.form.value);

      return;
    }
    this.commercial.commercialName = this.form.value.commercialName;
    this.commercial.statut = this.form.value.statut;

    console.log(this.commercial);

    this.saveCommercial(this.commercial);
  }

  updateCommercial(commercial: Commercial): void {
    this.commercialService.updateCommercial(commercial.id, commercial).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.modal.close('Accept click')
          this.getCommercials();
        }, error: (err) => {
          console.error(err);
        }
      });
  }

  // delete 

  deleteCommercial(id: number) {
    this.commercialService.deleteCommercial(id).subscribe({
      next: () => {
        console.log("Commercial deleted !", id);
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  // Success
  toastrSuccess(message: string) {
    this.toastr.success('👋 ' + message, 'Success!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  // Warning
  toastrWarning(message: string) {
    this.toastr.warning('👋 ' + message, 'Warning!', {
      toastClass: 'toast ngx-toastr',
      positionClass: 'toast-top-right'
    });
  }

  // add

  saveCommercial(commercial: Commercial): void {

    this.commercialService.createCommercial(commercial).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.modal.close('Accept click');
          this.toastrSuccess(" Commercial added successfully !! ");
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Your work has been saved',
          //   showConfirmButton: false,
          //   timer: 1500
          // });

          this.ngOnInit()
          this.submitted = false;
        }, error: (err) => {
          console.error(err);
        }
      });


  }

}
