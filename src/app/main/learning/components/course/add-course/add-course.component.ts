import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  course: Course = {
    id: 0,
    title: undefined,
    content: undefined,
    startDate: undefined,
    updateDate: undefined
  }

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private courseservice: CourseService, private router: Router,) { }


  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Cours',
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
            name: 'Learning',
            isLink: true,
            link: '/'
          },
          {
            name: 'Course',
            isLink: true,
            link: '/'
          },
          {
            name: 'Add Course',
            isLink: false
          }
        ]
      }
    };

    this.form = this.formBuilder.group(
      {
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern("[a-zA-Z]*")
          ]
        ],
        content: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(255)
          ]
        ]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.course = this.form.value;

    this.saveCourse();

  }

  saveCourse(): void {

    this.courseservice.add(this.course).subscribe(
      {
        next: (data) => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigateByUrl("learning/course/allcourses");
        }, error: (err) => {
          console.error(err);
        }
      });
  }

}
