import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  constructor(private backend: BackendService){}

  searchContacts(){
    console.log('searchContacts()');
    this.backend.searchContacts();
  }
}