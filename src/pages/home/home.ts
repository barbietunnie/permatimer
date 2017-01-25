import { StopTimingPage } from './../stop-timing/stop-timing';
import { Project } from './../../models/project';
import { ProjectsService } from './../../providers/projects-service';
import { Component } from '@angular/core';

import { NavController, AlertController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public projectService: ProjectsService, 
              public modalCtrl: ModalController) { }

  ionViewDidLoad() {
    this.projectService.load();
  }

  newProject(): void {
    let prompt = this.alertCtrl.create({
      title: 'New Project',
      message: 'Enter a name for your new project',
      inputs: [
        {
          name: 'title'
        }
      ], 
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            let project = new Project(data.title, new Date(), 0, false);
            this.projectService.addProject(project);
          }
        }
      ]
    });

    prompt.present();
  }

  toggleTimer(project): void {
    if(!project.active) {
      if(!this.projectService.projectActive) {
        this.projectService.startTiming(project, false);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'You are already timing a project. You must stop it before timing a new project',
          buttons: ['Ok']
        });

        alert.present();
      }
    } else {
      let elapsedTime = this.projectService.stopTiming(project);

      let modal = this.modalCtrl.create(StopTimingPage, {
        elapsedTime: elapsedTime
      });

      modal.onDidDismiss((modifiedSeconds) => {
        if(modifiedSeconds > elapsedTime) {
          let difference = modifiedSeconds - elapsedTime;
          this.projectService.increaseSeconds(project, difference);
        } else {
          let difference = modifiedSeconds - elapsedTime;
          this.projectService.decreaseSeconds(project, difference);
        }
      });

      modal.present();
    }
  }

}
