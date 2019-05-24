import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private backend: BackendService, private session: SessionService) {}

  login(credentials) {
    return this.backend.login(credentials)
    .then(() => {
      return this.session.setSession(credentials.username);
    });
  }

  logout(credentials) {
    return this.backend.logout(credentials)
    .then(() => {
      return this.session.clearSession();
    })
  }
}