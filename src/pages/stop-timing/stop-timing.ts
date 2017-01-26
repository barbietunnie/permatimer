import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the StopTiming page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stop-timing',
  templateUrl: 'stop-timing.html'
})
export class StopTimingPage {
  hours: number;
  minutes: number;
  seconds: number;
  elapsedTime: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
                                            public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.elapsedTime = this.navParams.get('elapsedTime');

    this.hours = Math.floor(this.elapsedTime / 60);
    this.minutes = Math.floor(this.minutes / 60);
    this.seconds = Math.floor(this.elapsedTime % 60);
  }

  submitTime(): void {
    let modifiedSeconds = (this.hours * 60 * 60) + (this.minutes * 60) + this.seconds;
    this.viewCtrl.dismiss(modifiedSeconds);
  }

}
