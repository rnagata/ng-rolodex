import {Component} from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  title: string = 'Angular Rolodex';
  loggedIn: boolean = true;

  constructor() {}
}