import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

interface ProfileResponse {
  username: string;
  name: string;
  email: string;
  address: string;
  created_at: string;
  updated_at: string;
  contacts: [];
}

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
  userID: number = 1;
  profile: {
    username: string;
    name: string;
    email: string;
    address: string;
    created_at: string;
    updated_at: string;
    contacts: [];
  }
  updates: {
    username: string,
    name: string,
    email: string,
    address: string,
  } = {
    username: '',
    name: '',
    email: '',
    address: '',
  }

  constructor(private backend: BackendService) {}

  ngOnInit(){
    this.backend.getProfile(this.userID)
    .then((data: ProfileResponse) => {
      this.profile = data;
    });
  }

  submit(){
    console.log(this.updates);
    this.backend.editProfile(this.userID, this.updates)
    .then((data: ProfileResponse) => {
      this.profile = data;
    })
  }
}