import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/Interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class RouteServiceService {

  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://localhost:5001';

//   httpOptions = {
//       headers: new HttpHeaders({
//           'Content-Type': 'application/json'
//       })
//   };


  getAllUsers(): Observable<User[]> {
      return this.http.get<User[]>(`${this.baseUrl}/api/routepage/getall`)
  }
  getUser(id: number): Observable<User> {
      return this.http.get<User>(`${this.baseUrl}/api/routepage/get/${id}`)
  }
  postUser(u: User): Observable<User> {
      return this.http.post<User>(`${this.baseUrl}/api/routepage/post`, u,) //this.httpOptions
  }
  updateUser(u: User): Observable<User> {
      return this.http.put<User>(`${this.baseUrl}/api/routepage/update`, u,) //this.httpOptions
  }
  deleteUser(u: User): Observable<User> {
      return this.http.request<User>('delete', `${this.baseUrl}/api/routepage/delete`, {body: u})
  }

}
