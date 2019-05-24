import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  constructor(private http: HttpClient) {}

  login(credentials) {
    return this.http.post('/api/login', credentials).toPromise();
  }

  logout(credentials) {
    return this.http.post('/api/logout', credentials).toPromise();
  }

  getProfile(id: number) {
    return this.http.get('/api/profile?user=' + id.toString()).toPromise();
  }

  editProfile(id: number, updates: object) {
    return this.http.put('/api/users?user=' + id.toString(), updates).toPromise();
  }
}