import { Component, OnInit } from '@angular/core';
import {Training} from "../../models/training.model";
import {Project} from "../../models/project.model";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {


   date: Date = new Date(2018, 0O5, 0O5);

  training1 : Training = {
  id: 1,
  name: 'Spring boot',
  start_Date: this.date,
  last_Update: this.date,
    description : ' Spring boot training'
}

  training2 : Training = {
    id: 2,
    name: 'Angular',
    start_Date: this.date,
    last_Update: this.date,
    description : ' Spring boot training'
  }

  training3 : Training = {
    id: 3,
    name: 'Vue js',
    start_Date: this.date,
    last_Update: this.date,
    description : ' Spring boot training'
  }

  training4 : Training = {
    id: 4,
    name: 'Node js',
    start_Date: this.date,
    last_Update: this.date,
    description : ' Spring boot training'
  }

  training5 : Training = {
    id: 5,
    name: 'Docker',
    start_Date: this.date,
    last_Update: this.date,
    description : ' Spring boot training'
  }

  project : Project = {
    id: 6,
    name: 'Big Project',
    description: 'GiantLink interns project  ',
    trainings: []
  }
  public contentHeader: object;



  constructor() { }

  ngOnInit(): void {

    this.project.trainings.push(this.training1)
    this.project.trainings.push(this.training2)
    this.project.trainings.push(this.training3)
    this.project.trainings.push(this.training4)
    this.project.trainings.push(this.training5)

    this.contentHeader = {
      headerTitle: "Company",
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
            name: "Learning",
            isLink: true,
            link: "/",
          },
          {
            name: "Training",
            isLink: true,
            link: "/",
          },

        ],
      },
    };


  }

  getTrainingByProject(project1 : Project){


    let tr = project1.trainings;

    return tr ;

  }

  trs  :    Training[]= this.getTrainingByProject(this.project);



}
