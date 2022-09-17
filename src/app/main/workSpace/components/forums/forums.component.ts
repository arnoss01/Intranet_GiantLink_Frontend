import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators,} from "@angular/forms";
import Swal from "sweetalert2";
import {Forum} from "../../models/forum.model";
import {ForumService} from "../../services/forum.service";



@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.scss']
})
export class ForumsComponent implements OnInit {
  contentHeader: {
    headerTitle: string;
    actionButton: boolean;
    breadcrumb: {
      type: string;
      links: (
          | { name: string; isLink: boolean; link: string }
          | { name: string; isLink: boolean; link?: undefined }
          )[];
    };
  };
  forums ?: Forum[];
  forum: Forum = {
    id: 0,
    name: "",
    description: "",

  };



  public carouselImages = {
    one: 'assets/images/slider/01.jpg',
    two: 'assets/images/slider/02.jpg',
    three: 'assets/images/slider/03.jpg',
    four: 'assets/images/slider/04.jpg',
    five: 'assets/images/slider/05.jpg',
    six: 'assets/images/slider/06.jpg'
  };




  constructor(    private modalService: NgbModal,
                  private forumService : ForumService ,
                  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getForums();
    this.contentHeader = {
      headerTitle: "Forum",
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
            name: "All forums",
            isLink: false,
          },
        ],
      },
    };
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      cin: [
        "",
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],

    });
  }
  public form: FormGroup = new FormGroup({
    name: new FormControl(""),
    cin: new FormControl(""),
    forumPurpose: new FormControl(""),
    observation: new FormControl(""),
  });
  submitted = false;

  get formControl(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  /* ********************Pagination and search ******************  */

  page = 1;
  count = 0;
  forumName = "";
  public pagePosition = 1;
  public totalPages = 0;
  public chkBoxSelected = [];

  public pageChanged(event: any): void {
    this.page = event;
    this.getForums();
  }

  getParams(page: number, pageSize: number, forumName: string) {
    let params: any = {};
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (forumName) {
      params["forumName"] = forumName;
    }
    return params;
  }

  public getForums(): void {
    const params = {
      page: this.page - 1,
      size: 8,
      forumName: this.forumName,
    };
    console.log(params);
    this.forumService.getForums(params).subscribe({
      next: (response: any) => {
        const { content, totalElements, totalPages } = response;
        console.log(content);

        this.count = totalElements;
        this.totalPages = totalPages * 10;
        this.forums = content;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
/* ********************ADD FORUM******************  */

  AddForum() : void  {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.forum.name = this.form.value.name;
    this.forum.description = this.form.value.cin;
    console.log(this.forum);
    this.createForum(this.forum);

  }
  createForum(forum: Forum): void {
    this.forumService.addForum(forum).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Forum has been saved with success",
          showConfirmButton: false,
          timer: 1500,
        });
        this.modalService.dismissAll("Cross click");
        this.ngOnInit();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  modalAdd(modalPrimaryAdd) {
    this.modalService.open(modalPrimaryAdd, {
      centered: true,
      windowClass: "modal modal-primary",
    });
  }



}
