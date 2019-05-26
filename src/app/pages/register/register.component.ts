import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Alias to describe the component's meta-data
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

// Class defining the component
export class RegisterComponent {
  // form data
  formData: {
    username: string;
    password: string;
    name: string;
    email: string;
    address: string;
  } = {
    username: '',
    password: '',
    name: '',
    email: '',
    address: '',
  }
  
  validation: {
    nameInvalid: boolean;
    nameErrorMessage: string;
    emailInvalid: boolean;
    emailErrorMessage: string;
    messageInvalid: boolean;
    messageErrorMessage: string;
  } = {
    nameInvalid: true,
    nameErrorMessage: '',
    emailInvalid: true,
    emailErrorMessage: '',
    messageInvalid: true,
    messageErrorMessage: '',
  }

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.register( this.formData )
    .then((response) => {
      this.router.navigate(['login']);
    })
  }
}
