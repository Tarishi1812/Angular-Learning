import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  constructor(private http: HttpClient) {}

  postUserData(data) {
    const url = 'http://localhost:3000/users';
    return this.http.post(url, data);
  }

  getUserData() {
    const url = 'http://localhost:3000/users';
    return this.http.get(url);
  }

  getPcData() {
    const url = 'http://localhost:3000/pcs';
    return this.http.get(url);
  }

  postPcData(data) {
    const url = 'http://localhost:3000/pcs';
    return this.http.post(url, data);
  }

  putPcData(id, data) {
    const url = 'http://localhost:3000/pcs';
    return this.http.put(`${url}/${id}`, data);
  }

  deletePcData(id) {
    const url = 'http://localhost:3000/pcs';
    return this.http.delete(`${url}/${id}`);
  }

  postGroupData(data) {
    const url = 'http://localhost:3000/groups';
    return this.http.post(url, data);
  }

  getGroupData() {
    const url = 'http://localhost:3000/groups';
    return this.http.get(url);
  }

  putGroupData(id, data) {
    const url = 'http://localhost:3000/groups';
    return this.http.put(`${url}/${id}`, data);
  }

  deleteGroupData(id) {
    const url = 'http://localhost:3000/groups';
    return this.http.delete(`${url}/${id}`);
  }
}
