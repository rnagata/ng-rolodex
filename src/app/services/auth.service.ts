import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private backend: BackendService, private session: SessionService) {}

  register(credentials) {
    return this.backend.register(credentials)
    .then((response) => {
      return response;
    })
  }

  login(credentials) {
    return this.backend.login(credentials)
    .then((response) => {
      return response;
      //return this.session.setSession(.username);
    });
  }

  // logout() {
  //   return this.backend.logout()
  //   .then(() => {
  //     return this.session.clearSession();
  //   })
  // }
}