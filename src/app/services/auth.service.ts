import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const currentUser = localStorage.getItem("currentUser");
    const parsedUser: User | null = currentUser ? JSON.parse(currentUser) : null;

    // Initialize BehaviorSubject with parsed user or a default value
    this.currentUserSubject = new BehaviorSubject<User | null>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(environment.apiUrl + '/login', credentials, { headers })
      .pipe(
        map((user: User) => {
          // Store user details and jwt token in local storage
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

}
