import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss']
})
export class AllCoursesComponent implements OnInit {

  contentHeader: { headerTitle: string; actionButton: boolean; breadcrumb: { type: string; links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; }; };

  courses?: Course[];
  //trainingId: number;

  course: Course = {
    id: null,
    title: '',
    content: '',
    startDate: undefined,
    updateDate: undefined
  }

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Course',
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
            name: 'AllCourses',
            isLink: false
          }
        ]
      }
    };
  }


  public get(): void {

    this.courseService.getByTrainingId(1).subscribe(
      {
        next: (response: any) => {
          this.courses = response

        }, error: (err) => {
          console.error(err);
        }
      }
    );
  }

}
