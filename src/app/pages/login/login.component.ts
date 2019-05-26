import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// Alias to describe the component's meta-data
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

// Class defining the component
export class LoginComponent {
  // form data
  formData: {
    username: string;
    password: string;
  } = {
    username: '',
    password: '',
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

  validateUsername() {
    if (!this.formData.username) {
      this.validation.nameErrorMessage = 'Name is Required';
      return (this)
    } 
  }


  // form should call method in component when user clicks submit button.
  submit(){
    // validation

    // method calls auth service which creates a promise
    this.auth.login( this.formData )
    .then((response) => {
      // log server's response
      // console.log(response);
      // valid data triggers this action
      this.router.navigate(['home']);
    }); 
  }
}