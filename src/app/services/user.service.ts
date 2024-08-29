import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post<User>(`${environment.apiUrl}/users/register`, user, { headers })
      .pipe(map(response => response));
  }


  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.get<User[]>(environment.apiUrl + '/users', {
      headers: headers,
    }).pipe(map(user => user));
  }
}
