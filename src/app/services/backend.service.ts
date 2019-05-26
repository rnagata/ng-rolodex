import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  constructor(private http: HttpClient) {}

  register(credentials) {
    return this.http.post('/api/register', credentials).toPromise();
  }

  searchContacts() {
    return this.http.get('/api/contacts/search').toPromise();  //GET /api/contacts/search/:term?user=:id
  }

  login(credentials) {
    // console.log('login()')
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