import { Injectable } from '@angular/core';
import { Customer, User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: any): Observable<User> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post<User>(`${environment.apiUrl}/applicationUser`, user, { headers })
      .pipe(map(response => response));
  }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.http.post<User>(`${environment.apiUrl}/users/customer`, user, { headers })
      .pipe(map(response => response));
  }

  saveCustomer(user: User): Observable<User>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  return this.http.put<User>(`${environment.apiUrl}/users/saveCustomer`, user, { headers })
    .pipe(map(response => response));
  }

  deleteCustomer(user:User): Observable<User>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json');

  return this.http.delete<User>(`${environment.apiUrl}/users/deleteCustomer/${user.id}`, { headers })
    .pipe(map(response => response));
  }

  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.get<User[]>(environment.apiUrl + '/users', {
      headers: headers,
    }).pipe(map(user => user));
  }

  getAllCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
    return this.http.get<Customer[]>(environment.apiUrl + '/users/customers', {
      headers: headers,
    }).pipe(map(user => user as Customer[]));
  }


}
