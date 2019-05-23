import {Component} from '@angular/core';
// import {BackendService} from '../../services/backend.service';

@Component({
  selector: 'login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class LoginForm {
  credentials: {
    username: string;
  } = {
    username: ''
  }

  constructor() {}

  submit() {
    const { username } = this.credentials;
    console.log(username);
  }
}