import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the HoursMinutesSeconds pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'hours-minutes-seconds'
})
@Injectable()
export class HoursMinutesSeconds {
  /*
    Takes a value and converts it to hours, minutes and seconds
   */
  transform(value, args) {
    let minutes = Math.floor(value / 60);
    let hours = Math.floor(minutes / 60);
    let seconds = Math.floor(value % 60);

    return hours + " hours " + minutes + " minutes " + seconds + " secs";
  }
}
