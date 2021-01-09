import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  uName: string;
  title = 'Practice';

  constructor(private evt: EventService) {}

  ngOnInit() {
    // this.evt.childEventListner().subscribe(resp => {
    //   console.log(resp);

    //   this.uName = resp
    // }) // Keeping for knowledge purpose..not using Behaviour Subject
    const name = sessionStorage.getItem('name');
    this.uName = name;
  }

  logout() {
    sessionStorage.clear();
    window.location.href = 'signup';
  }
}
